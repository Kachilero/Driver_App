/**
 * User Settings Page
 *
 * Change and Save user settings
 */
import * as React from 'react';
import { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

type UserSettingsState = {
  emailUserName: string;
  emailPassword: string;
};
type UserSettingsProps = {};

const getInitialState = (props: UserSettingsProps): UserSettingsState => {
  return {
    emailUserName: process.env.EMAIL_USERNAME,
    emailPassword: process.env.EMAIL_PASSWORD
  };
};

class UserSettingsView extends Component<UserSettingsProps, UserSettingsState> {
  readonly state = getInitialState(this.props);

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
    console.log(`User Settings State`);
    console.log(this.state);
    console.log(`Process ENV`);
    console.log(process.env.EMAIL_USERNAME);

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
                <Row>
                  <Col md="12">
                    <h2>Email Settings</h2>
                    <ul>
                      <li>Email: {this.state.emailUserName}</li>
                      <li>Password: {this.state.emailPassword}</li>
                    </ul>
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
