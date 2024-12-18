import useTitle from '../hooks/useTitle';
import RouterTable from '../components/routers/router-table';
import ShowForm from '../components/show-form';
import { useState } from 'react';
import NewRouter from '../components/routers/new-router';

export default function Routers() {
	useTitle('Routers');
	const [show, setShow] = useState(false);

	return (
		<>
			<div className='bg-gray-800 mt-2 rounded-md'>
				<header className='flex justify-between items-center px-4 py-2'>
					<h2 className='text-center text-2xl font-bold'>Routers</h2>
					<div>
						<ShowForm title='Nuevo Router' show={show} setShow={setShow}>
							<NewRouter setShow={setShow} />
						</ShowForm>
					</div>
				</header>
				<RouterTable />
			</div>
		</>
	);
}
