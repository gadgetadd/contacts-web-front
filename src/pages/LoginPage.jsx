import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import { string } from 'yup';
import { enqueueSnackbar } from 'notistack';

import {
  Container,
  Avatar,
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { logIn } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';
import { clearError } from '@/redux/authSlice';

export default function LoginPage() {
  const { error, isAuth } = useAuth();
  const [isValid, setValid] = useState({ email: true, password: true });
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailSchema = string().email();

  const passwordSchema = string().min(8);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const inputChangeHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'email':
        emailSchema
          .validate(value)
          .then(() => setValid(prev => ({ ...prev, email: true })))
          .catch(() => setValid(prev => ({ ...prev, email: false })));
        setEmail(value);
        break;
      case 'password':
        passwordSchema
          .validate(value)
          .then(() => setValid(prev => ({ ...prev, password: true })))
          .catch(() => setValid(prev => ({ ...prev, password: false })));
        setPassword(value);
        break;
      default:
        throw new Error('unsupported input name');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!isValid.email) {
      enqueueSnackbar('Please enter the correct email', {
        variant: 'error',
      });
      return;
    }
    if (!isValid.password) {
      enqueueSnackbar('Please enter the correct password', {
        variant: 'error',
      });
      return;
    }
    const formEls = e.target.elements;
    const user = {
      email: formEls.email.value,
      password: formEls.password.value,
    };
    dispatch(logIn(user));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {isAuth ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <LockOutlinedIcon />
          )}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            onChange={inputChangeHandler}
            type="email"
            value={email}
            error={!isValid.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={inputChangeHandler}
            value={password}
            error={!isValid.password}
            title="Password must contain at least 8 characters"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isAuth}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">
          {error !== 'Network Error'
            ? 'Invalid email or password. Please check and try again.'
            : error}
        </Alert>
      )}
    </Container>
  );
}
