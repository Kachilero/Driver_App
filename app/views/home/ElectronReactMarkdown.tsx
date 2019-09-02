/**
 * VIEW for React Markdown page in Home.layout
 *
 *
 * We're gonna pass the URL of the MD file to the component from here.
 *
 */
import * as React from 'react';
import { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import MarkdownRenderer from '../../components/MarkdownRenderer';

type State = {};
type Props = {};

class ReactMarkdown extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
  }

  render() {
    const fileURL = 'electonReact.md';
    return (
      <div id="main-row">
        <div id="pg-content">
          <Container>
            <Row>
              <Col md={12} id="markdown-render">
                <MarkdownRenderer mdFilePath={fileURL} escapeHtml={true} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ReactMarkdown;
