import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
      
      // Apply the red gradient background in dark mode
      if (savedTheme === 'dark') {
        document.body.classList.add('bg-gradient-to-r', 'from-red-900', 'to-red-700');
      } else {
        document.body.classList.remove('bg-gradient-to-r', 'from-red-900', 'to-red-700');
      }
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.classList.toggle('light', !isDarkMode);
      
      // Apply the red gradient background if system preference is dark mode
      if (isDarkMode) {
        document.body.classList.add('bg-gradient-to-r', 'from-red-900', 'to-red-700');
      }
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
    
    // Toggle the red gradient background
    if (newTheme === 'dark') {
      document.body.classList.add('bg-gradient-to-r', 'from-red-900', 'to-red-700');
    } else {
      document.body.classList.remove('bg-gradient-to-r', 'from-red-900', 'to-red-700');
    }
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;