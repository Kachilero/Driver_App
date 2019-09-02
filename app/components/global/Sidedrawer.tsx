/**
 * Side Drawer Component
 */
import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import SideDrawerNavLinks from './SideDrawerNavLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons';

type State = {
  hover: boolean;
};

type Props = {
  routes: any;
  headline: string;
  onClick: () => void;
  onThemeClick: () => void;
  sideDrawerReducer: {
    [key: string]: boolean;
  };
  sideDrawerHover: () => void;
};

const getInitialState = (props: Props): State => {
  return {
    hover: false
  };
};

class SideDrawer extends Component<Props> {
  readonly state = getInitialState(this.props);

  // handles click event
  onCollapse = () => {
    this.props.onClick();
  };

  onThemeClick = event => {
    const value = event.target.checked;
    this.setState({
      themeToggle: value
    });
    this.props.onThemeClick();
  };

  handleHover = () => {
    this.props.sideDrawerHover();
  };

  static getDerivedStateFromProps(props, state) {
    if (props.sideDrawerReducer.hoverState !== state.hover) {
      return { hover: props.sideDrawerReducer.hoverState };
    }
    return null;
  }

  render() {
    const activeClass = this.props.sideDrawerReducer.isOpen ? 'active' : '';
    const hoverClass = this.state.hover ? 'active' : '';

    return (
      <div id="sidebar" className={activeClass}>
        <div id="inmovable-object">
          <Nav
            // onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
            id="sidebar__menu"
            className={`sidebar ${activeClass} ${hoverClass}`}
          >
            <div className="sidebar-header">
              <FontAwesomeIcon
                icon={faHome}
                className="d-inline-block sidebar-header__icon"
              />
              <div className="d-inline-block sidebar-header__headline">
                <h4 className="text-center">{this.props.headline}</h4>
              </div>
              <a
                href="#"
                className="sidebar-header__link"
                onClick={e => {
                  e.preventDefault();
                  this.onCollapse();
                }}
              >
                <div className="fa-container__sidebar-header__chevron-left">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              </a>
            </div>
            {/* Sidebar links go here */}
            <div id="components">
              <SideDrawerNavLinks
                {...this.props}
                routes={this.props.routes}
                as="div"
              />
            </div>
          </Nav>
        </div>
      </div>
    );
  }
}

export default SideDrawer;
