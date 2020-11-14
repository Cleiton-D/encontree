import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvider } from './hooks/auth';

import theme from './styles/theme';

import Routes from './routes';

const App = (): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

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
