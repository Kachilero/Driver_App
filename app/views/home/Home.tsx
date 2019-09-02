import * as React from 'react';
import { Component } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
const { shell } = require('electron');

// Images
const npm = require('../../constants/img/npm.png');
const reactImg = require('../../constants/img/react.png');
const reactRouter = require('../../constants/img/reactRouter.png');
const redux = require('../../constants/img/redux.png');
const webpack = require('../../constants/img/webpack.png');
const reactBootstrap = require('../../constants/img/react-bootstrap.svg');
const ts = require('../../constants/img/ts.png');
const electron = require('../../constants/img/electron.png');

type State = {};
type Props = {};

const imageStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

class Home extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
  }

  // Mouse events need to return a function, not call the function directly.
  externalURL = url => {
    return () => {
      shell.openExternal(url);
    };
  };

  render() {
    return (
      <div id="main-row">
        <div id="pg-content">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1 className="text-center mt-5">Electron React Multi Use App</h1>
              <p className="text-center">
                This is an implementation of several technologies which you can
                read about by following the links in the side bar. The main goal
                of this application was to create something using Electron that
                could possibly help people out.
              </p>
              <p className="text-center">
                I hope you can find thing that work for you here.
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h2 className="text-center">
                Made with these great technologies
              </h2>
            </Col>
          </Row>

          <Container>
            <Row className="py-3">
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={npm}
                  alt={'NPM'}
                  onClick={this.externalURL('https://www.npmjs.com/')}
                  style={{ cursor: 'pointer' }}
                  fluid
                />
              </Col>
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={reactImg}
                  alt={'React'}
                  onClick={this.externalURL('https://reactjs.org/')}
                  style={{ cursor: 'pointer' }}
                  fluid
                />
              </Col>
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={reactRouter}
                  alt={'React Router'}
                  onClick={this.externalURL(
                    'https://reacttraining.com/react-router/'
                  )}
                  style={{ cursor: 'pointer' }}
                  fluid
                />
              </Col>
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={redux}
                  alt={'Redux'}
                  onClick={this.externalURL('https://redux.js.org/')}
                  style={{ cursor: 'pointer' }}
                  fluid
                />
              </Col>
            </Row>

            <Row className="py-3">
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={webpack}
                  alt={'webpack'}
                  onClick={this.externalURL('https://webpack.js.org/')}
                  style={{ cursor: 'pointer' }}
                  fluid
                />
              </Col>
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={reactBootstrap}
                  alt={'React Bootstrap'}
                  onClick={this.externalURL(
                    'https://react-bootstrap.github.io/'
                  )}
                  style={{ cursor: 'pointer', maxWidth: '60%' }}
                  fluid
                />
              </Col>
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={ts}
                  alt={'TypeScript'}
                  onClick={this.externalURL('https://www.typescriptlang.org/')}
                  style={{ cursor: 'pointer', width: '130px' }}
                  fluid
                />
              </Col>
              <Col sm={6} md={3} style={imageStyles}>
                <Image
                  src={electron}
                  alt={'Electron'}
                  onClick={this.externalURL('https://electronjs.org/')}
                  style={{ cursor: 'pointer' }}
                  fluid
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

// Chande this to use connect if needed
export default Home;
