import { useState } from 'react';
import ServiceTable from '../components/services/services-table';
import NewService from '../components/services/new-service';
import ShowForm from '../components/show-form';
import useTitle from '../hooks/useTitle';

export default function Services() {
	useTitle('Servicios');
	const [show, setShow] = useState(false);

	return (
		<>
			<div className='bg-gray-800 mt-2 rounded-md'>
				<header className='flex justify-between items-center px-4 py-2'>
					<h2 className='text-center text-2xl font-bold'>Servicios</h2>
					<div>
						<ShowForm title='Nuevo Servicio' show={show} setShow={setShow}>
							<NewService setShow={setShow} />
						</ShowForm>
					</div>
				</header>
				<ServiceTable />
			</div>
		</>
	);
}
