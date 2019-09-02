/**
 * Creates Nav Links for the Side Drawer
 *
 * TODO: Add ability to pass a FontAwesomeIcon
 *
 */
import * as React from 'react';
import { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface State {}
interface Props {
  routes: any;
  as?: string;
}

class SideDrawerNavLinks extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
  }

  static activeRoute(passedRoute) {
    // Had to go the simple JS route
    return window.location.href.indexOf(passedRoute) > -1 ? 'active' : '';
  }

  render() {
    return (
      <>
        {this.props.routes.map((props, key) => {
          let isActive = SideDrawerNavLinks.activeRoute(
            props.layout + props.path
          );
          return (
            <div className={`item ${isActive}`} key={key}>
              <Nav.Link
                as={NavLink}
                to={props.layout + props.path}
                className="sidebar__nav-link"
              >
                {props.name}
              </Nav.Link>
            </div>
          );
        })}
      </>
    );
  }
}

export default SideDrawerNavLinks;
