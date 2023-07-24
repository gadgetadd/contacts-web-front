import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { string } from 'yup';

import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { signUp } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';
import { clearError } from '@/redux/authSlice';

export default function RegisterPage() {
  const { error, isAuth } = useAuth();
  const [isValid, setValid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const nameSchema = string()
    .matches(/^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]+([' -][a-zA-Zа-яіїєґА-ЯІЇЄҐ]*)*$/)
    .max(35);

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
      case 'firstName':
        nameSchema
          .validate(value)
          .then(() => setValid(prev => ({ ...prev, firstName: true })))
          .catch(() => setValid(prev => ({ ...prev, firstName: false })));
        setFirstName(value);
        break;
      case 'lastName':
        nameSchema
          .validate(value)
          .then(() => setValid(prev => ({ ...prev, lastName: true })))
          .catch(() => setValid(prev => ({ ...prev, lastName: false })));
        setLastName(value);
        break;
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
      case 'confirmPassword':
        if (value === password) {
          setValid(prev => ({ ...prev, confirmPassword: true }));
        } else {
          setValid(prev => ({ ...prev, confirmPassword: false }));
        }
        setConfirmPassword(value);
        break;
      default:
        throw new Error('unsupported input name');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    const isValidData =
      isValid.firstName &&
      isValid.lastName &&
      isValid.email &&
      isValid.password &&
      isValid.confirmPassword;
    if (!isValidData) {
      enqueueSnackbar('Please check the entered data', {
        variant: 'error',
      });
      return;
    }
    const formEls = e.target.elements;
    const user = {
      name: `${formEls.firstName.value} ${formEls.lastName.value}`,
      email: formEls.email.value,
      password: formEls.password.value,
    };
    dispatch(signUp(user)).then(res => {
      if (res.type === 'auth/signup/fulfilled') navigate('/verify');
    });
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={inputChangeHandler}
                type="text"
                value={firstName}
                error={!isValid.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={inputChangeHandler}
                type="text"
                value={lastName}
                error={!isValid.lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={inputChangeHandler}
                type="email"
                value={email}
                error={!isValid.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={inputChangeHandler}
                value={password}
                error={!isValid.password}
                title="Password must contain at least 8 characters"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={inputChangeHandler}
                value={confirmPassword}
                error={!isValid.confirmPassword}
                title="Password must contain at least 8 characters"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isAuth}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/verify">
                Already have an code? Verify your account
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">
          {error !== 'Network Error'
            ? 'This user is already registered. Please try again with a another email'
            : error}
        </Alert>
      )}
    </Container>
  );
}
