import React from 'react';
import { useAuth } from '../hooks/useAmplify';
import { useHistory } from 'react-router-dom';
import { AUTH_USER_TOKEN_KEY } from '../util';

import { Box, Button, Heading } from '@chakra-ui/core';

const Dashboard = () => {
  const Auth = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    Auth.signOut({ global: true })
      .then((data) => {
        // TODO: SignOut toast
      })
      .catch((err) => console.error(err));

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
