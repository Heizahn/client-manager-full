import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useEffect } from 'react';
import LayoutPrincipal from '../components/Layout/layout-principal';

function ProtectedRoute() {
	const { isLogged } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) {
			navigate('/login');
		}
	}, [isLogged]);

	return <Outlet />;
}

export default ProtectedRoute;
