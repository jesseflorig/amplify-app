import React from 'react';
import { usePageTitle } from '../hooks/browser-hooks';

import { Box, Heading } from '@chakra-ui/core';
import AppBar from './AppBar';

const Dashboard = () => {
  usePageTitle('Dashboard');

  return (
    <Box>
      <AppBar />
      <Box p={2}>
        <Heading>You are logged in!</Heading>
      </Box>
    </Box>
  );
};

export default Dashboard;
