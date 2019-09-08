/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { parse } from 'url';
import axios from 'axios';
import qs from 'qs';

// Google Auth Constants
const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';
const GOOGLE_REDIRECT_URI = 'http://127.0.0.1:3001';

require('dotenv').config();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

// Google Sign In
export async function googleSignIn() {
  const code = await signInWithPopup();
  const tokens = await fetchAccessTokens(code);
  /**
   * This is what we get back from the profile
   *
   * { id: '105894579716395182331',
   *    email: 'alejcerro@gmail.com',
   *    verified_email: true,
   *    name: 'Alejandro Cerro',
   *    given_name: 'Alejandro',
   *    family_name: 'Cerro',
   *    picture:
   *    'https://lh3.googleusercontent.com/a-/AAuE7mAVUR-h1kx8oRcgKq8RiD_yNyJTry3u3N0LOUg4NwA',
   *    locale: 'en'
   * }
   */
  const { id, email, name } = await fetchGoogleProfile(tokens.access_token);
  const providerUser = {
    uid: id,
    email,
    displayName: name,
    idToken: tokens.id_token
  };
  return providerUser;
}

// Open a window and watch it for changes to get auth
export function signInWithPopup() {
  return new Promise((resolve, reject) => {
    const authWindow = new BrowserWindow({
      width: 500,
      height: 600,
      show: true
    });

    const urlParams = {
      response_type: 'code',
      redirect_uri: GOOGLE_REDIRECT_URI,
      client_id: process.env.GOOGLE_CLIENT_ID,
      scope: 'profile email'
    };

    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`;

    function handleNavigation(url) {
      const query = parse(url, true).query;
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`));
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed');
          setImmediate(() => authWindow.close());
          // This is the auth token
          resolve(query.code);
        }
      } else {
        reject(new Error(`No Query returned: ${query}`));
      }
    }

    authWindow.on('closed', () => {
      throw new Error('Auth window closed by user');
    });

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url);
    });

    authWindow.webContents.on('will-redirect', (event, url) => {
      handleNavigation(url);
    });

    authWindow.loadURL(authUrl);
  });
}

// Get tokens
export async function fetchAccessTokens(code) {
  const response = await axios.post(
    GOOGLE_TOKEN_URL,
    qs.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data;
}

// Get the Profile
export async function fetchGoogleProfile(accessToken) {
  const response = await axios.get(GOOGLE_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

ipcMain.on('google-oauth', async (event, arg) => {
  const signInPromise = googleSignIn();
  signInPromise.then(
    response => {
      console.log(`Login Success`);
      window.localStorage.setItem('google-token', response.idToken);
      return response;
    },
    err => {
      console.log(`Login Failure`);
    }
  );
});
