import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Sync with System Preference by default
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || getSystemTheme();
  });

  // Handle System Theme Changes in real-time
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemChange = (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      let next;
      if (prev === 'light') next = 'dark';
      else if (prev === 'dark') next = 'pure-black';
      else next = 'light';
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Smooth transition between themes
    document.documentElement.style.transition = 'all 0.5s ease-in-out';
    document.body.className = theme === 'pure-black' ? 'bg-black' : '';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, getSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
