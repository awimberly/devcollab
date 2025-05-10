import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || 'Login failed.');
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
        <p className="forgot-password" onClick={() => alert("Forgot password flow coming soon!")}>
          Forgot password?
        </p>
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
