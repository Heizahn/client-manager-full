import { useClientsContext } from '../../../context/useClientsContext';
import ClientRow from './client-row';

export default function ClientsTable() {
	const { filterClients } = useClientsContext();
	return (
		<div className='max-h-[calc(100vh_-_8.5rem)] overflow-auto scrollbar-none scroll-smooth rounded-b-md'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Cedula</th>
						<th>Telefono</th>
						<th>Sector</th>
						<th>IPV4</th>
						<th>Corte</th>
						<th>Plan</th>
						<th>Saldo</th>
						<th>Estado</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filterClients().map((client, idx) => (
						<ClientRow key={idx} client={client} />
					))}
				</tbody>
			</table>
		</div>
	);
}
