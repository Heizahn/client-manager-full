import { useSectors } from '../../services/sectors';
import SectorRow from './sector-row';
import Skeleton from './skeleton';

export default function SectorTable() {
	const { data: sectors, isLoading, error } = useSectors();

	if (isLoading) {
		return <Skeleton />;
	}

	if (error) {
		return <div className='ml-4'>Error al cargar</div>;
	}

	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Fecha creación</th>
						<th>Creado por</th>
						<th>Clientes</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{sectors.map((sector) => (
						<SectorRow key={sector.id} sector={sector} />
					))}
				</tbody>
			</table>
		</div>
	);
}
