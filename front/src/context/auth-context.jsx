import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
	const [isLogged, setIsLogged] = useState(true);
	const [user, login] = useState({});

	function logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		setIsLogged(false);
		login({});
		toast.warning('Sesión cerrada');
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = JSON.parse(localStorage.getItem('user') || null);
			login(user);
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isLogged, setIsLogged, logout, user, login }}>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
