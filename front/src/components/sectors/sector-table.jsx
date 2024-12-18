import { useSectors } from '../../services/sectors';
import SectorRow from './sector-row';

export default function SectorTable() {
	const { data: sectors, isLoading, error } = useSectors();

	if (isLoading) {
		return <div className='flex justify-center items-center'>Cargando...</div>;
	}

	if (error) {
		return <div className='flex justify-center items-center'>Error al cargar</div>;
	}

	if (!sectors) {
		return <div>No hay sectores</div>;
	}

	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md mt-1'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>Creado</th>
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
