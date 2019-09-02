/**
 * Builds an accordion with links
 *
 * TODO: Have the icon be dynamic
 * */
import * as React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import SideDrawerNavLinks from './SideDrawerNavLinks';

type State = {};
type Props = {
  routes: any;
  title: string;
  as?: string;
};

class SideDrawerAccordion extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
  }

  static activeRoute(passedRoute) {
    return window.location.href.indexOf(passedRoute) > -1 ? 'active' : '';
  }

  render() {
    const { title } = this.props;
    return (
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <FontAwesomeIcon icon={faHome} />
            <span>{title}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ul>
                <SideDrawerNavLinks
                  {...this.props}
                  routes={this.props.routes}
                />
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default SideDrawerAccordion;
