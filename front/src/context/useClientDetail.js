import { useContext } from 'react';
import { ClientDetailContext } from './ClientDetailContext';

export const useClientDetail = () => {
	const context = useContext(ClientDetailContext);
	if (!context) {
		throw new Error('useClientDetail must be used within a ClientDetailProvider');
	}
	return context;
};
