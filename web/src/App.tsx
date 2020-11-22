import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

import Routes from './routes';

import GlobalStyles from './styles/global';
import theme from './styles/theme';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes />
          <GlobalStyles />
        </AuthProvider>
      </ToastProvider>
    </Router>
  </ThemeProvider>
);

export default App;
