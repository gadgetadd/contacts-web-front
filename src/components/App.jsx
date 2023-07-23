import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';

import PrivateRoute from './Routes/PrivateRoute';
import RestrictedRoute from './Routes/RestrictedRoute';
import AppBar from '@/components/AppBar';
import Loader from '@/components/Loader';

import { refreshUser } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const VerifyPage = lazy(() => import('@/pages/VerifyPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const ContactsPage = lazy(() => import('@/pages/ContactsPage'));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <SnackbarProvider />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<Navigate to={'/contacts'} />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/verify"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<VerifyPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={'/contacts'} />} />
        </Routes>
      )}
    </>
  );
}
