import { useContext } from 'react';
import { ClientsContext } from './ClientsContext';

export function useClientsContext() {
	const context = useContext(ClientsContext);
	if (context === undefined) {
		throw new Error('useClientsContext must be used within a ClientsProvider');
	}
	return context;
}
