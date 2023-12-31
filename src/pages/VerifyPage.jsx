import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
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

import { verify } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';
import { clearError } from '@/redux/authSlice';

export default function VerifyPage() {
  const { error, isAuth } = useAuth();
  const [isValid, setValid] = useState(true);
  const dispatch = useDispatch();

  const [code, setCode] = useState('');

  const codeSchema = string().matches(/^\d{8}$/);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const inputChangeHandler = e => {
    const { value } = e.target;
    codeSchema
      .validate(value)
      .then(() => setValid(true))
      .catch(() => setValid(false));
    setCode(value);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!isValid) {
      enqueueSnackbar('Please check the entered data', {
        variant: 'error',
      });
      return;
    }
    const verificationToken = e.target.elements.code.value;
    dispatch(verify({ verificationToken }));
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
          Verify your account
        </Typography>
        <Typography component="p" variant="body2">
          A code has been sent to your email address.
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <TextField
            onChange={inputChangeHandler}
            value={code}
            error={!isValid}
            title="Code must contain 8 numbers"
            required
            fullWidth
            name="code"
            label="Verification code"
            type="text"
            id="code"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isAuth}
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/resend">
                {'Haven`t a code? Request a resend.'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">
          {error !== 'Network Error'
            ? 'The code entered is not valid. If your email already confirmed, try to sign in. Or create a new account.'
            : error}
        </Alert>
      )}
    </Container>
  );
}
