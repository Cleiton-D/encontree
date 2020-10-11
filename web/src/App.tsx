import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import theme from './styles/theme';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <h1>Hello World</h1>
  </ThemeProvider>
);

export default App;
