import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo = "/",
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to={redirectTo} />
    }
  />
);

export default GuardedRoute;
