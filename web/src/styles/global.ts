import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Light'), local('Roboto-Light'),
        url('/fonts/roboto-v20-latin-300.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'),
        url('/fonts/roboto-v20-latin-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto-Medium'),
        url('../fonts/roboto-v20-latin-500.woff2') format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before, &::after {
      box-sizing: inherit;
    }
  }

  html {
    font-size: 62.5%;
  }

  body {
    height: 100vh;
  }

  #root {
    height: 100%;
    padding: 15px;
  }

  ${({ theme }) => css`
    body,
    input,
    button {
      font-family: ${theme.font.family};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong {
      font-weight: ${theme.font.bold};
    }

    button {
      cursor: pointer;
    }
  `}

`;
