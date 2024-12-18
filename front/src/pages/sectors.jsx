import NewSector from '../components/sectors/new-sector';
import SectorTable from '../components/sectors/sector-table';
import ShowForm from '../components/show-form';
import { useState } from 'react';

export default function Sectors() {
	const [show, setShow] = useState(false);
	return (
		<>
			<div className='bg-gray-800 mt-3 rounded-md'>
				<header className='flex justify-between items-center px-4 py-1'>
					<h2 className='text-center text-lg font-bold'>Sectores</h2>
					<div>
						<ShowForm title='Nuevo Sector' setShow={setShow} show={show}>
							<NewSector setShow={setShow} />
						</ShowForm>
					</div>
				</header>
				<div className='mt-1 border-b-2 border-gray-700' />
				<SectorTable />
			</div>
		</>
	);
}
