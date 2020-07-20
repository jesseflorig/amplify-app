import React from 'react';
import CustomTheme from '../theme';

// Components
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CSSReset />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
