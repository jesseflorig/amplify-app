import React from 'react';
import { useAuth } from '../hooks/amplify-hooks';
import { useHistory } from 'react-router-dom';
import { AUTH_USER_TOKEN_KEY } from '../util';

import { Button } from '@chakra-ui/core';

const SignOutButton = (props) => {
  const Auth = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    Auth.signOut({ global: true })
      .then((data) => {
        // TODO: SignOut Toast
      })
      .catch((err) => {
        // TODO: SignOut Error Toast
      });

    localStorage.removeItem(AUTH_USER_TOKEN_KEY);
    history.push('/signIn');
  };

  return (
    <Button {...props} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
