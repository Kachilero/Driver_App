/**
 * User Settings Page
 *
 * Change and Save user settings
 */
import * as React from 'react';
import { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const emailCongig = require('../constants/email_config');
import Imap from 'imap';
// import mailparser from 'mailparser';
import { inspect } from 'util';

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

  handleGettingEmail() {
    console.log(`Handle Email Called`);
    const imap = new Imap({
      user: this.state.emailEmail,
      password: this.state.emailPassword,
      host: this.state.emailIMAP.host,
      port: this.state.emailIMAP.port,
      secure: this.state.emailIMAP.secure,
      tls: true
    });

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
      console.log(`IMAP READY`);
      openInbox(function(err, box) {
        if (err) {
          throw err;
        }
        let f = imap.seq.fetch('1:3', {
          bodies: 'HEADERS.FIELDS (FROM TO SUBJECT DATE)',
          struct: true
        });
        f.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          const prefix = '(#' + seqno + ')';
          msg.on('body', function(stream, info) {
            let buffer = '';
            stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', function() {
              console.log(
                prefix + 'Parsed header: %s',
                inspect(Imap.parseHeader(buffer))
              );
            });
          }); // end body
          msg.once('attributes', function(attrs) {
            console.log(prefix + 'Attributes: $s', inspect(attrs, false, 8));
          });
          msg.once('end', function() {
            console.log(prefix + 'Finished');
          });
        }); // end message
        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
          console.log(`Done fetching messages!`);
          imap.end();
        });
      });
    });

    imap.once('error', function(err) {
      console.error('IMAP Fetch error: ' + err);
      console.log(err);
      console.log(err.source);
    });

    imap.once('end', function() {
      console.log(`Connection Ended`);
    });

    imap.connect();
  }

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
    const { emailName, emailEmail, emailUserName, emailPassword } = this.state;

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
                      <li>Name: {emailName}</li>
                      <li>Email: {emailEmail}</li>
                      <li>Username: {emailUserName}</li>
                      <li>Password: {emailPassword}</li>
                    </ul>
                    <form
                      ref="form"
                      onSubmit={e => {
                        e.preventDefault();
                        this.handleGettingEmail();
                      }}
                    >
                      <input
                        type="submit"
                        value="Get Emails"
                        className="btn btn-primary"
                      />
                    </form>
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
