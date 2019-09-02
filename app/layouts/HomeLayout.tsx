/**
 * This is a basic INIT layout
 * NOTE: The header is handled by AppLayout
 */
import * as React from 'react';
import { Component } from 'react';

import { homeRoutes } from '../constants/routes/homeRoutes';
import { Route, Switch } from 'react-router-dom';
import SideDrawer from '../components/global/Sidedrawer';

interface homeState {}
interface homeProps {
  sideDrawerReducer: {
    [key: string]: boolean;
  };
  themeReducer: {
    [key: string]: boolean;
  };
  onSideDrawerClick: () => void;
  onThemeClick: () => void;
  sideDrawerHover: () => void;
}

class HomeLayout extends Component<homeProps> {
  state: homeState;

  // Maps the links to the switch
  getRoutes = passedRoutes => {
    return passedRoutes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          render={props => <prop.component {...props} />}
          key={key}
        />
      );
    });
  };

  // This handles the state of the sidebar
  handleClick = () => {
    this.props.onSideDrawerClick();
  };

  handleThemeClick = () => {
    this.props.onThemeClick();
  };

  componentDidMount(): void {
    // Make sure we're at the top of the page when we navigate between views
    window.scrollTo(0, 0);
  }

  componentDidUpdate(
    prevProps: Readonly<homeProps>,
    prevState: Readonly<homeState>,
    snapshot?: any
  ): void {
    // Make sure we're at the top of the page when we navigate between views
    window.scrollTo(0, 0);
  }

  render() {
    const mainClass: string = this.props.sideDrawerReducer.isOpen
      ? 'main_main sd-open'
      : 'main_main';
    return (
      <div id="main-child-wrapper">
        <SideDrawer
          {...this.props}
          routes={homeRoutes}
          headline="Home"
          onClick={() => this.handleClick()}
          onThemeClick={() => this.handleThemeClick()}
        />
        <main role="main" id="main-window" className={mainClass}>
          <Switch>{this.getRoutes(homeRoutes)}</Switch>
        </main>
      </div>
    );
  }
}

export default HomeLayout;
