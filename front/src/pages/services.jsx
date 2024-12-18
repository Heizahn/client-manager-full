import { useState } from 'react';
import ServiceTable from '../components/services/services-table';
import { useServices } from '../services/services';
import NewService from '../components/services/new-service';
import ShowForm from '../components/show-form';

export default function Services() {
	const [show, setShow] = useState(false);
	const { data, isLoading, error } = useServices();
	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	console.log(data);
	return (
		<>
			<div className='bg-gray-800 mt-3 rounded-t-md'>
				<header className='flex justify-between items-center px-4 py-1'>
					<h2 className='text-center text-lg font-bold'>Servicios</h2>
					<ShowForm title='Nuevo Servicio' show={show} setShow={setShow}>
						<NewService setShow={setShow} />
					</ShowForm>
				</header>
			</div>
			<ServiceTable services={data} />
		</>
	);
}
