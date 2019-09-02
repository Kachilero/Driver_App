/**
 * Block for code in markdown render
 *
 * TODO change the components so it parses the languages used
 */
import * as React from 'react';
import { Component } from 'react';
import hljs from 'highlight.js';

interface State {
  codeEl: any;
}

interface Props {
  value: string;
  language?: string;
}

class MarkdowCodeBlock extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.state = {
      codeEl: ''
    };
  }

  setRef(el) {
    this.state.codeEl = el;
  }

  componentDidMount(): void {
    this.highlightCode();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.state.codeEl);
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
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
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

export default MarkdowCodeBlock;
