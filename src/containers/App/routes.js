import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './routes-config';

const ControlledRoute = ({
  mode,
  component: Component,
  shouldLoad,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (shouldLoad) {
        return mode ? (
          <Component mode={mode} {...props} />
        ) : (
          <Component {...props} />
        );
      }

      return <Redirect to={{ pathname: redirectTo }} />;
    }}
  />
);

export default (isAuthenticated) => (
  <Switch>
    {ROUTES.map(
      ({
        controlled,
        shouldNotBeAuthenticated,
        shouldBeAuthenticated,
        ...rest
      }) => {
        if (controlled) {
          return (
            <ControlledRoute
              key={rest.path}
              {...rest}
              shouldLoad={
                (shouldNotBeAuthenticated && !isAuthenticated) ||
                (shouldBeAuthenticated && isAuthenticated)
              }
            />
          );
        }
        if (rest.redirectTo) {
          return (
            <Route
              key={rest.path}
              {...rest}
              render={() => <Redirect to={{ pathname: rest.redirectTo }} />}
            />
          );
        }
        return <Route key="not-found" {...rest} />;
      },
    )}
  </Switch>
);
