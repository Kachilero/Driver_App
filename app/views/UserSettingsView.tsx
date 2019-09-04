/**
 * User Settings Page
 *
 * Change and Save user settings
 */
import * as React from 'react';
import { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const emailCongig = require('../constants/email_config');

// TODO: move all of these into the global store
type UserSettingsState = {
  emailName: string;
  emailEmail: string;
  emailUserName: string;
  emailPassword: string;
  emailIMAP: {
    host: string;
    port: number;
    secure: boolean;
  };
  emailSMTP: {
    host: string;
    ssl: boolean;
  };
};
type UserSettingsProps = {};

const getInitialState = (props: UserSettingsProps): UserSettingsState => {
  return {
    emailName: emailCongig.name,
    emailEmail: emailCongig.email,
    emailUserName: process.env.EMAIL_USERNAME,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailIMAP: {
      host: emailCongig.imap.host,
      port: emailCongig.imap.port,
      secure: emailCongig.imap.secure
    },
    emailSMTP: {
      host: emailCongig.smtp.host,
      ssl: emailCongig.smtp.ssl
    }
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
                      <li>Name: {this.state.emailName}</li>
                      <li>Email: {this.state.emailEmail}</li>
                      <li>Username: {this.state.emailUserName}</li>
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
