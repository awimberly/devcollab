import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { syncUserToDb } from "../utils/syncUserToDb";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      await syncUserToDb();
      console.log("Login success:", data);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h2>Log in</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input">
          <label htmlFor="email">Email:</label>
          <TextField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password:</label>
          <TextField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
        </div>
        <p
          className="forgot-password"
          onClick={() => alert("Forgot password flow coming soon!")}
        >
          Forgot password?
        </p>
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
