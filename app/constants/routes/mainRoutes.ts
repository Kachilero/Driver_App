/**
 * Main Router
 *
 * Main routes load the container which will then load the components
 */
import { LayoutRoutes } from '../../Routes';
import CounterPage from '../../containers/CounterPage';
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
  },
  {
    path: '/counter',
    name: 'Counter',
    component: CounterPage,
    layout: '/counter',
    icon: ''
  }
];

export default mainRoutes;
