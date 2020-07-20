import React from 'react';
import PropTypes from 'prop-types';
import { AUTH_USER_TOKEN_KEY, validateToken } from '../util';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const localToken = localStorage.getItem(AUTH_USER_TOKEN_KEY);
  const isAuthenticated = validateToken(localToken);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
