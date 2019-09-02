import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
const routes = require('../constants/routes.json');
const styles = require('../styles/plain-css/Counter.css');

type Props = {
  increment: () => void;
  incrementIfOdd: () => void;
  incrementAsync: () => void;
  incrementByFive: () => void;
  decrement: () => void;
  counter: number;
};

export default class Counter extends Component<Props> {
  props: Props;

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      incrementByFive,
      decrement,
      counter
    } = this.props;
    return (
      <Container className="main-child-wrapper" style={{ paddingTop: '100px' }}>
        <Row>
          <Col md={12}>
            <div className={styles.backButton} data-tid="backButton">
              <Link to={routes.HOME}>
                <FontAwesomeIcon icon={faArrowLeft} size="3x" />
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={2}>
            <div className={`counter ${styles.counter}`} data-tid="counter">
              {counter}
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={10}>
            <div className={styles.btnGroup}>
              <button
                className={styles.btn}
                onClick={incrementByFive}
                data-tclass="btn"
                type="button"
              >
                5
              </button>
              <button
                className={styles.btn}
                onClick={increment}
                data-tclass="btn"
                type="button"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className={styles.btn}
                onClick={decrement}
                data-tclass="btn"
                type="button"
              >
                <i className="fa fa-minus" />
              </button>
              <button
                className={styles.btn}
                onClick={incrementIfOdd}
                data-tclass="btn"
                type="button"
              >
                odd
              </button>
              <button
                className={styles.btn}
                onClick={() => incrementAsync()}
                data-tclass="btn"
                type="button"
              >
                async
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
