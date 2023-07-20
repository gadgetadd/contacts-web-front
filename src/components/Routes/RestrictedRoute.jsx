import PropTypes from "prop-types"
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function RestrictedRoute({
  component: Component,
  redirectTo = '/',
}) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

RestrictedRoute.propTypes = {
  component: PropTypes.element,
  redirectTo: PropTypes.string
}
