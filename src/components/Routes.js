import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashbaord';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Routes = () => {
  return (
    <Router>
      <Route path="/signin" component={SignIn} exact />
      <Route path="/signup" component={SignUp} exact />
      <Route path="/forgot-password" component={ForgotPassword} exact />
      <PrivateRoute path="/" component={Dashboard} />
    </Router>
  );
};

export default Routes;
