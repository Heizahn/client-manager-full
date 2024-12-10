import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext({
	isLogged: true,
	setIsLogged: () => {},
	logout: () => {},
});

export function AuthProvider({ children }) {
	const [isLogged, setIsLogged] = useState(true);

	function logout() {
		localStorage.removeItem('token');
		setIsLogged(false);
		toast.warning('Sesión cerrada');
	}

	useEffect(() => {
		const toke = JSON.parse(localStorage.getItem('token') || null);
		if (toke) {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isLogged, setIsLogged, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}
