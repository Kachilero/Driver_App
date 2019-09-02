/**
 * Main Window Component
 * This houses the main window elements
 * */
import * as React from 'react';
import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

// Components
import Home from '../views/home/Home';

// Actions
// import { addActiveClass, flipSideState } from '../actions/sideDrawer';

// Styles

// Prop and State
type Props = {};

export default class MainWindow extends Component<Props> {
  props: Props;

  render() {
    // const { sideDrawer } = this.props;
    // let mainClass = sideDrawer
    //   ? 'flex-shrink-0'
    //   : 'flex-shrink-0 pd__large';
    const mainClass = 'flex-shrink-0 pd__large';

    return (
      <div id="main-child-wrapper">
        <main role="main" id="main-window" className={mainClass}>
          <div id="main-row">
            {/* We'll replace the inner content here with the view switcher */}
            <div id="pg-content">
              <Row>
                <Col xl="10" md="9" xs="12" className="main-module">
                  <Home />
                </Col>
              </Row>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
