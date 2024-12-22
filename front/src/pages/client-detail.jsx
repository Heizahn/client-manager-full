import { ClientDetailProvider } from '../context/client-detail-context';
import ClientHeader from '../components/client/header';
import DetailClient from '../components/client/detail-client';
import { useParams } from 'react-router-dom';
import { useClientById } from '../services/clients';

export default function ClientDetail() {
	const { id } = useParams();
	const { data, error, isLoading } = useClientById(id);

	if (error) {
		return <div>Error</div>;
	}

	if (isLoading) {
		return <div>Loading</div>;
	}

	document.title = data.nombre;
	return (
		<main className='flex flex-col md:overflow-hidden'>
			<ClientDetailProvider>
				<ClientHeader
					id={id}
					client={{
						nombre: data.nombre,
						direccion: data.direccion,
						saldo: data.saldo,
						estado: data.estado,
					}}
					routerIp={data.router.ip}
				/>
				<DetailClient client={data} />
			</ClientDetailProvider>
		</main>
	);
}
