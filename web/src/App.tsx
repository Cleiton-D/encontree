import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';

import GlobalStyles from './styles/global';
import theme from './styles/theme';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes />
    </Router>
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
