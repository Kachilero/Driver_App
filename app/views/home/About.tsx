/**
 * About Page
 */
import * as React from 'react';
import { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import MarkdownRenderer from '../../components/MarkdownRenderer';

type State = {};
type Props = {};

class About extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
  }

  render() {
    const fileUrl = 'README.md';
    return (
      <div id="main-row">
        <div id="pg-content">
          <Container>
            <Row>
              <Col md={12} id="markdown-render">
                <MarkdownRenderer mdFilePath={fileUrl} escapeHtml={true} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default About;
