import { useEffect, useState } from 'react';

export function useDarkMode(defaultTheme: 'light' | 'dark' = 'light') {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
