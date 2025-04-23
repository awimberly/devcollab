import './styles/global.scss';
import './App.scss';
import QuickLinks from './components/QuickLinks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDarkMode } from './hooks/useDarkMode';  

function App() {
  const { theme, toggleTheme } = useDarkMode();
  
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="header">
        <div className='header-text'>Developer Dashboard</div>
        <div className='theme-toggle'>
          {theme === 'light' ? (
            <DarkModeIcon className='theme-icon' color="primary" onClick={toggleTheme} titleAccess="Switch to dark mode" />
          ) : (
            <LightModeIcon className='theme-icon' color="primary" onClick={toggleTheme} titleAccess="Switch to light mode" />
          )}
        </div>           
      </div>
      <QuickLinks />   
    </ThemeProvider>
  )
}

export default App
