import { Outlet, useNavigate, parsePath } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useEffect } from 'react';
import { validateToken } from '../services/auth';

function ProtectedRoute() {
  const { isLogged, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';
  const { pathname } = parsePath(window.location.pathname);

  useEffect(() => {
    if (!token || !validateToken(token)) {
      logout();
    }
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, pathname]);

  return <Outlet />;
}

export default ProtectedRoute;
