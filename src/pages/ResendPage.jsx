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

import { resend } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';
import { clearError } from '@/redux/authSlice';

export default function ResendPage() {
  const { error, isAuth } = useAuth();
  const [isValid, setValid] = useState(true);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const emailSchema = string().email();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const inputChangeHandler = e => {
    const { value } = e.target;
    emailSchema
      .validate(value)
      .then(() => setValid(true))
      .catch(() => setValid(false));
    setEmail(value);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!isValid) {
      enqueueSnackbar('Please check the entered data', {
        variant: 'error',
      });
      return;
    }
    const email = e.target.elements.email.value;
    dispatch(resend({ email })).then(res => {
      if (res.type === 'auth/resend/fulfilled') navigate('/verify');
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
          Enter your email
        </Typography>
        <Typography component="p" variant="body2">
          We will resend you a code if you already have an account.
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <TextField
            onChange={inputChangeHandler}
            value={email}
            error={!isValid}
            title="Enter your email"
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isAuth}
            sx={{ mt: 3, mb: 2 }}
          >
            Resend a code
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/login">
                {"Don't have a code? Request a resend."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">
          {error !== 'Network Error'
            ? 'This user is not waiting for verification, try to sign in or sign up.'
            : error}
        </Alert>
      )}
    </Container>
  );
}
