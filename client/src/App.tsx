import "./styles/global.scss";
import "./App.scss";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useDarkMode } from "./hooks/useDarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Login from "./components/Login";
import QuickLinks from "./components/QuickLinks";
import { useSyncUser } from "./hooks/useSyncUser";

function App() {
  const { theme, toggleTheme } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useSyncUser(); //sync auth.user from supabase to the "User" table on app load

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={muiTheme}>
      {isAuthenticated ? (
        <>
          <div className="header">
            <div className="header-text">Developer Dashboard</div>
            <div className="theme-toggle">
              {theme === "light" ? (
                <DarkModeIcon
                  className="theme-icon"
                  color="primary"
                  onClick={toggleTheme}
                />
              ) : (
                <LightModeIcon
                  className="theme-icon"
                  color="primary"
                  onClick={toggleTheme}
                />
              )}
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
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
