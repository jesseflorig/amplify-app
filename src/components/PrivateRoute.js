import React from 'react';
import PropTypes from 'prop-types';
import { AUTH_USER_TOKEN_KEY, validateToken } from '../util';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, path, ...rest }) => {
  const localToken = localStorage.getItem(AUTH_USER_TOKEN_KEY);
  const isAuthenticated = validateToken(localToken);

  return isAuthenticated ? (
    <Route path={path} component={component} {...rest} />
  ) : (
    <Redirect from={path} to="/signin" />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
};

export default PrivateRoute;
