/**
 * Header component to be re-used on every page
 *
 * This would be the VIEW
 *
 * @function onCollapse = returns a function to the callback, so we can trigger
 *  the toggling of the side drawer.
 *
 * @function handleMouse = if this.props.hoverState is false waits 200ms then
 *  returns a function to the callback to trigger the side drawer
 *
 * @function activeRoute = takes a route and checks it against the current page
 *  if they match, it sets it as the currently active route
 *
 * @getDerivedStateFromProps = CURRENTLY ONLY FOR THEME
 *  changes the NavBar variables - depends on props.theme
 * */
import * as React from 'react';
import { Component } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
// Import static values
import mainRoutes from '../../constants/routes/mainRoutes';
// Import Header Widgets
import Timer from './header-widgets/timer/Timer';

type HeaderState = {};

type HeaderProps = {
  isOpen: boolean;
  hoverState: boolean;
  theme: boolean;
  toggleSideDrawer: () => void;
  sideDrawerHover: () => void;
};

class Header extends Component<HeaderProps, HeaderState> {
  readonly state: HeaderState;

  // Handles the click event
  onCollapse = () => {
    this.props.toggleSideDrawer();
  };

  handleMouse = () => {
    if (!this.props.hoverState) {
      setTimeout(() => {
        this.props.sideDrawerHover();
      }, 200);
    }
  };

  // Sets active class on link based on route
  static activeRoute(passedRoute) {
    return window.location.href.indexOf(passedRoute) > -1 ? 'active' : '';
  }

  render() {
    const { isOpen } = this.props;
    const activeClass = isOpen ? '' : 'active';
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <div
          id="fa-container__hover"
          onMouseEnter={this.handleMouse}
          onMouseLeave={this.handleMouse}
        >
          <div
            onClick={this.onCollapse}
            className={`fa-container__header-ellipsis ${activeClass}`}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
        <Navbar.Brand>Multi Use App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <NavDropdown id="header-nav-dropdown" title="Main Links">
            {mainRoutes.map((props, key) => {
              return (
                <NavDropdown.Item
                  key={key}
                  as={NavLink}
                  to={props.layout + props.path}
                  className={Header.activeRoute(props.layout + props.path)}
                >
                  {props.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <Timer />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
