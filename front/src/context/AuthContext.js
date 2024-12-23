import { createContext } from 'react';

export const AuthContext = createContext({
	isLogged: true,
	user: {},
	setIsLogged: () => {},
	logout: () => {},
	login: () => {},
});
