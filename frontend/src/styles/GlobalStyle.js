import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    background: #f5f7fa;
    color: #222;
    min-height: 100vh;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle; 