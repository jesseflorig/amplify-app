import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import ConfirmForgotPassword from './ConfirmForgotPassword';
import ConfirmSignUp from './ConfirmSignUp';
import Dashboard from './Dashbaord';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UpdatePassowrd from './UpdatePassword';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/confirm-signup" component={ConfirmSignUp} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />
        <Route
          path="/confirm-forgot-password"
          component={ConfirmForgotPassword}
          exact
        />
        <Route path="/update-password" component={UpdatePassowrd} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  );
};

export default Routes;
