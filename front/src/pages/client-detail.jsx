import { ClientDetailProvider } from '../context/client-detail-context';
import ClientHeader from '../components/client/header';
import DetailClient from '../components/client/detail-client';
import { useParams } from 'react-router-dom';
import { useClientById } from '../services/clients';
import ServiceReceivableTable from '../components/client/service-receivable/services-receivable-table';

export default function ClientDetail() {
	const { id } = useParams();
	const { data: client, error, isLoading } = useClientById(id);

	if (isLoading) return <div>Loading</div>;
	if (error) return <div>Error: {error.message}</div>;

	document.title = client.nombre;
	return (
		<main className='flex flex-col md:overflow-hidden'>
			<ClientDetailProvider>
				<ClientHeader
					id={id}
					client={{
						nombre: client.nombre,
						direccion: client.direccion,
						saldo: client.saldo,
						estado: client.estado,
					}}
					routerIp={client.router.ip}
				/>
				<DetailClient client={client} />
				<ServiceReceivableTable servicesReceivables={client.service_receivable} />
			</ClientDetailProvider>
		</main>
	);
}
