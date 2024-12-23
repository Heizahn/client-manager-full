import { useState } from 'react';
import PropTypes from 'prop-types';
import { ClientsContext } from './ClientsContext';

export function ClientsProvider({ children }) {
	const [clients, setClients] = useState([]);
	const [clientFilter, setClientFilter] = useState('');

	const filterClients = () => {
		if (clientFilter === '') {
			return clients;
		}
		return clients.filter(
			(client) =>
				client.nombre.toLowerCase().includes(clientFilter.toLowerCase()) ||
				client.identificacion.toLowerCase().includes(clientFilter.toLowerCase()) ||
				client.telefono.toLowerCase().includes(clientFilter.toLowerCase()) ||
				client.sectors?.nombre_sector
					.toLowerCase()
					.includes(clientFilter.toLowerCase()) ||
				client.ipv4.toLowerCase().includes(clientFilter.toLowerCase()),
		);
	};

	return (
		<ClientsContext.Provider
			value={{
				clients,
				setClients,
				setFilter: setClientFilter,
				filterClients,
			}}
		>
			{children}
		</ClientsContext.Provider>
	);
}

ClientsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
