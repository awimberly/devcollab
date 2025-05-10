import './styles/global.scss';
import './App.scss';
import { useDarkMode } from './hooks/useDarkMode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import QuickLinks from './components/QuickLinks';
import { useAuth } from './context/AuthContext';

function App() {
  const { theme, toggleTheme } = useDarkMode();
  const { isAuthenticated } = useAuth();

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
        {isAuthenticated ? (
          <>
            <div className="header">
              <div className='header-text'>Developer Dashboard</div>
              <div className='theme-toggle'>
                {theme === 'light' ? (
                  <DarkModeIcon className='theme-icon' color="primary" onClick={toggleTheme} />
                ) : (
                  <LightModeIcon className='theme-icon' color="primary" onClick={toggleTheme} />
                )}
              </div>
            </div>
            <QuickLinks />
          </>
        ) : (
          <Login />
        )}
    </ThemeProvider>
  );
}

export default App;
