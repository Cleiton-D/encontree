import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import theme from './styles/theme';

import Routes from './routes';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  </ThemeProvider>
);

export default App;
