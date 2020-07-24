import React from 'react';
import { usePageTitle } from '../hooks/browser-hooks';
import { useAuth } from '../hooks/amplify-hooks';
import { useHistory } from 'react-router-dom';
import { AUTH_USER_TOKEN_KEY } from '../util';

import { Box, Button, Heading } from '@chakra-ui/core';

const Dashboard = () => {
  const Auth = useAuth();
  const history = useHistory();

  usePageTitle('Dashboard');

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
    <Box>
      <Heading>You are logged in!</Heading>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Box>
  );
};

export default Dashboard;
