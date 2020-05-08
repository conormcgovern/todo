import { useState } from 'react';

function useTheme() {
  const getTheme = () => {
    if (document.body.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  };
  const [theme, setTheme] = useState(() => getTheme());

  const toggleTheme = () => {
    if (document.body.classList.contains('light')) {
      document.body.classList.replace('light', 'dark');
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else if (document.body.classList.contains('dark')) {
      document.body.classList.replace('dark', 'light');
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.body.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return [theme, toggleTheme];
}

export default useTheme;
