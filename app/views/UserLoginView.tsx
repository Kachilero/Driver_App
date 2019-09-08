/**
 * Login View
 */
import * as React from 'react';
import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { ipcRenderer } from 'electron';

const emailConfig = require('../constants/email_config');

type UserLoginState = {
  isAuthenticated: boolean;
  user: any;
  token: string;
};
type UserLoginProps = {};

const getInitialState = (props: UserLoginProps): UserLoginState => {
  return {
    isAuthenticated: false,
    user: null,
    token: ''
  };
};

class UserLoginView extends Component<UserLoginProps, UserLoginState> {
  readonly state = getInitialState(this.props);

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null
    });
  };

  // The authentication response
  // TODO: store this in LocalStorage for persistence and/or in the user settings
  googleResponse = e => {
    console.log(`The response from Google??`);
    console.log(e);
  };

  googleLogin = async () => {
    console.log(`googleLogin Button`);
    ipcRenderer.send('google-oauth', 'get-token');

    // let loginCall = new Promise((resolve, reject) => {
    //   const ipcCall = ipcRenderer.send('google-oauth', 'get-token');
    //   console.log(ipcCall);
    //   // @ts-ignore
    //   if (ipcCall) {
    //     resolve(ipcCall)
    //   } else {
    //     reject(Error("Promise rejected"))
    //   }
    // });
    //
    // loginCall.then( result => {
    //   console.log(`Got a result`);
    //   console.log(result);
    // }, function(error) {
    //   console.log(`Got an Error`);
    //   console.log(error);
    // })
  };

  onFailure = error => {
    alert(error);
  };

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    console.log(`Client ID: ${emailConfig.GOOGLE_CLIENT_ID}`);
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <Button variant="info" onClick={this.logout}>
          Log Out
        </Button>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId={emailConfig.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
          cookiePolicy={'single_host_origin'}
        />
        <Button
          variant="success"
          onClick={e => {
            this.googleLogin();
          }}
        >
          Login
        </Button>
      </div>
    );

    return (
      <div id="main-child-wrapper">
        <main role="main" id="main-window" className="main_main">
          <div id="main-row">
            <div id="pg-content">
              <Container>
                <Row>
                  <Col md="12">
                    <h1 className="text-center">Login</h1>
                    {content}
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default UserLoginView;
