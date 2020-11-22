import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvider } from './hooks/auth';

import theme from './styles/theme';

import Routes from './routes';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
