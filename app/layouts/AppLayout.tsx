/**
 * Main entry that handles the header and the store
 *
 * */
import * as React from 'react';

import Header from '../components/global/Header';

export type AppLayoutProps = {
  children;
  sideDrawerReducer?: {
    [key: string]: boolean;
  };
  themeReducer?: {
    [key: string]: boolean;
  };
  toggleSideDrawer: () => void;
  sideDrawerHover: () => void;
};

class AppLayout extends React.Component<AppLayoutProps> {
  render() {
    const {
      children,
      sideDrawerReducer,
      themeReducer,
      toggleSideDrawer,
      sideDrawerHover
    } = this.props;

    return (
      <div id="main-wrapper">
        <Header
          theme={themeReducer.isLight}
          isOpen={sideDrawerReducer.isOpen}
          hoverState={sideDrawerReducer.hoverState}
          toggleSideDrawer={toggleSideDrawer}
          sideDrawerHover={sideDrawerHover}
        />
        <React.Fragment>{children}</React.Fragment>
      </div>
    );
  }
}

export default AppLayout;
