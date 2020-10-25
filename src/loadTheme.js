export default function loadTheme() {
  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme === 'light') {
    document.body.classList.add('light');
  } else if (storedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.add('light');
  }
}
