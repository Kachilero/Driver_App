/**
 * User Settings Page
 *
 * Change and Save user settings
 */
import * as React from 'react';
import { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

type State = {};
type Props = {};

class UserSettingsView extends Component<Props, State> {
  state: State;

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <div id="main-child-wrapper">
        <main role="main" id="main-window" className="main_main">
          <div id="main-row">
            <div id="pg-content">
              <Container>
                <Row>
                  <Col md="12">
                    <h1 className="title text-center">User Settings</h1>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default UserSettingsView;
