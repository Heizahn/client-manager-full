import { createContext } from 'react';

export const ClientsContext = createContext({
	clients: [],
	setClients: () => {},
	setFilter: () => {},
	filterClients: () => [],
});
