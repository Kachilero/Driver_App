/**
 * This component will render markdown files passed to it
 *
 * @var state.markdown string This will be the markdown file to parse
 * @var state.stylesheet string This is the relative URL of the stylesheet to use
 * @var props.mdFilePath string The name of the markdown file
 * @var props.escapeHtml boolean Whether to render HTML - see docs
 *
 * @return React.Component
 *
 * TODO: Create way to change styling dynamically
 */
import * as React from 'react';
import { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownCodeBlock from './MarkdowCodeBlock';

interface State {
  markdown: string;
  styleSheet: string;
}
interface Props {
  mdFilePath: string;
  escapeHtml: boolean;
}

class MarkdownRenderer extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      markdown: '',
      styleSheet: '../app/styles/plain-css/github.css'
    };
  }

  componentWillMount(): void {
    // Get the contents from the Markdown file and put them in the React state,
    // so we can reference it in render() below.
    fetch(`../app/content/markdown/${this.props.mdFilePath}`)
      .then(res => res.text())
      .then(text => this.setState({ markdown: text }));
    // Check to see if stylesheet was already loaded
    if (!document.getElementById('markdowncss')) {
      // Get the stylesheet and load it in the HEAD
      const head = document.head;
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = this.state.styleSheet;
      link.id = 'markdowncss';
      head.append(link);
    }
  }

  render() {
    const { markdown } = this.state;
    return (
      <ReactMarkdown
        source={markdown}
        renderers={{ code: MarkdownCodeBlock }}
        escapeHtml={this.props.escapeHtml}
      />
    );
  }
}

export default MarkdownRenderer;
