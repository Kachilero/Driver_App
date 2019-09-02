import * as React from 'react';
import { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
// const { shell } = require('electron');

type State = {};
type Props = {};

class Home extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
  }

  // Mouse events need to return a function, not call the function directly.
  /*
  externalURL = url => {
    return () => {
      shell.openExternal(url);
    };
  };
  */

  render() {
    return (
      <div id="main-row">
        <div id="pg-content">
          <Container>
            <Row>
              <Col md="12">
                <h1 className="title text-center">Driver App Dashboard</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

// Change this to use connect if needed
export default Home;
