/**
 * Main Router
 *
 * Main routes load the container which will then load the components
 */
import { LayoutRoutes } from '../../Routes';
import AboutPage from '../../containers/AboutPageContainer';
import HomePage from '../../containers/HomePageContainer';

const mainRoutes: LayoutRoutes[] = [
  {
    path: '/home',
    name: 'Welcome',
    component: HomePage,
    layout: '/home',
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
