/**
 * Main Router
 *
 * Main routes load the container which will then load the components
 */
import { LayoutRoutes } from '../../Routes';
import AboutPage from '../../containers/AboutPageContainer';
import HomePage from '../../containers/HomePageContainer';
import UserSettingsView from '../../views/UserSettingsView';
import UserLoginView from '../../views/UserLoginView';

const mainRoutes: LayoutRoutes[] = [
  {
    path: '/home',
    name: 'Dashboard',
    component: HomePage,
    layout: '/home',
    icon: ''
  },
  {
    path: '/user-settings',
    name: 'User Settings',
    component: UserSettingsView,
    layout: '/user-settings',
    icon: ''
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLoginView,
    layout: '/login',
    icon: ''
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    layout: '/about',
    icon: ''
  }
];

export default mainRoutes;
