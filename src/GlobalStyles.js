import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  
  *, *:before, *:after {
  box-sizing: border-box;
  }

  html {
    font-family: 'Roboto', sans-serif;
    --min-tap-target-height: 56px;
    --navbar-height: 56px;
    --icon-size: 20px;
    --icon-button-size: var(--min-tap-target-height);
    --sidebar-width-open: 16rem;
    --sidebar-width-closed: 0;

    @media (min-width: 600px) {
      --min-tap-target-height: 32px;
    }
    
    /* Colors */
    --gray-0: #121212;
    --gray-1: #1b1b1b;
    --gray-2: #202020;
    --gray-3: #e0e0e0;
    --gray-4: #eeeeee;
    --gray-5: #7a7a7a;

    --blue-0: #2196f3;
    --blue-1: #448aff;
    --blue-2: #83b9ff;

    --purple-0: #8c9eff;
    --purple-1: #5870cb;

    /* default to light mode styles */
    --bg: #ffffff;
    --color-primary: var(--purple-1);
    --color-secondary: var(--gray-4);
    --color-tertiary: var(--gray-3);
    --color-text: black;
    --icon-color-primary:  var(--color-primary);
    --icon-color-secondary: white;
    --navbar-color: var(--color-primary);
    color: var(--color-text);
  }

  .light {
    --bg: #ffffff;
    --color-primary: var(--purple-1);
    --color-secondary: var(--gray-4);
    --color-tertiary: var(--gray-3);
    --color-text: black;
    --icon-color-primary:  var(--color-primary);
    --icon-color-secondary: white;
    --navbar-color: var(--color-primary);
    color: var(--color-text);
  }

  .dark {
    --bg: var(--gray-0);
    --color-primary: var(--purple-0);
    --color-secondary: var(--gray-1);
    --color-tertiary: var(--gray-2);
    --color-text: var(--gray-3);
    --icon-color-primary:  var(--color-primary);
    --icon-color-secondary: var(--gray-1);
    --navbar-color: var(--color-secondary);
    color: var(--color-text);
    p {
      opacity: 87%;
    }
    input {
      opacity: 87%;
    }
  }

  body {
    background-color: var(--bg);
    margin: 0;
    transition: background 250ms ease-in-out, color 500ms ease-in-out;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .wrapper {
    margin-left: 24rem;
  }

  .push-right {
    margin-left: auto;
  }

`;

export default GlobalStyles;
