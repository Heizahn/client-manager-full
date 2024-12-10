import { createContext, useContext, useEffect, useState } from 'react';

const ClientsContext = createContext({
  clients: [],
  setClients: () => {},
  setFilter: () => {},
  filterClients: () => [],
});

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
        client.identificacion
          .toLowerCase()
          .includes(clientFilter.toLowerCase()) ||
        client.telefono.toLowerCase().includes(clientFilter.toLowerCase()) ||
        client.sectors?.nombre_sector
          .toLowerCase()
          .includes(clientFilter.toLowerCase()) ||
        client.ipv4.toLowerCase().includes(clientFilter.toLowerCase()),
    );
  };

  useEffect(() => {
    filterClients();
  }, [clients.length]);
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

export function useClientsContext() {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error('useClientsContext must be used within a ClientsProvider');
  }
  return context;
}
