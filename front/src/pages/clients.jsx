import React from 'react';
import useTitle from '../hooks/useTitle';
import { useClients } from '../services/clients';
import { ClientsProvider } from '../context/clients-context';
import SearchClient from '../components/Table/search-client';
import NavFilter from '../components/filters/navFilter';
import ClientsTable from '../components/Table/clients-table';
import ShowFormNewClient from '../components/client/new-client/show-new-client';

function Clients() {
  useTitle('Clientes');
  const { data, isLoading, error } = useClients();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ClientsProvider>
        <header className="flex flex-row justify-between items-center p-3 rounded-md bg-gray-800  sticky top-0 z-10">
          <NavFilter clients={data} />
        </header>
        <main className="mt-2">
          <div className="flex flex-row justify-between items-center py-2 px-4 rounded-t-md bg-gray-800 ">
            <h2 className="text-center text-2xl font-bold">Clientes</h2>

            <div className="flex flex-row items-center gap-4">
              <SearchClient />
              <ShowFormNewClient />
            </div>
          </div>
          <ClientsTable />
        </main>
      </ClientsProvider>
    </>
  );
}

export default Clients;
