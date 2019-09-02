import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import mainRoutes from './constants/routes/mainRoutes';

import { ComponentClass } from 'react';

export interface LayoutRoutes {
  path: string;
  name: string;
  component: ComponentClass;
  layout: string;
  icon?: string;
}

export default () => {
  return (
    <App>
      <Switch>
        {mainRoutes.map((props, key) => {
          return (
            <Route key={key} path={props.path} component={props.component} />
          );
        })}
        <Redirect from="/" to="/home/home" />
      </Switch>
    </App>
  );
};
