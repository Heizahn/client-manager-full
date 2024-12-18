import NewSector from '../components/sectors/new-sector';
import SectorTable from '../components/sectors/sector-table';
import ShowForm from '../components/show-form';
import { useState } from 'react';
import useTitle from '../hooks/useTitle';

export default function Sectors() {
	useTitle('Sectores');
	const [show, setShow] = useState(false);
	return (
		<>
			<div className='bg-gray-800 mt-2 rounded-md'>
				<header className='flex justify-between items-center px-4 py-2'>
					<h2 className='text-center text-2xl font-bold'>Sectores</h2>
					<div>
						<ShowForm title='Nuevo Sector' setShow={setShow} show={show}>
							<NewSector setShow={setShow} />
						</ShowForm>
					</div>
				</header>
				<SectorTable />
			</div>
		</>
	);
}
