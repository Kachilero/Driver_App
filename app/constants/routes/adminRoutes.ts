/**
 * These routes pertain to the admin page.
 */
import { LayoutRoutes } from '../../Routes';
import CounterPage from '../../containers/CounterPage';
import AboutPage from '../../containers/AboutPageContainer';

export const adminRoutes: LayoutRoutes[] = [
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    layout: '/admin',
    icon: ''
  },
  {
    path: '/counter',
    name: 'Counter',
    component: CounterPage,
    layout: '/admin',
    icon: ''
  }
];
