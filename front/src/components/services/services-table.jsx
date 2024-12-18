import { useServices } from '../../services/services';
import ServiceRow from './service-row';

export default function ServiceTable() {
	const { data: services, isLoading, error } = useServices();
	if (isLoading) {
		return <div>Cargando...</div>;
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
						<th>Tipo</th>
						<th>Clientes</th>
						<th>Costo</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service) => (
						<ServiceRow key={service.id} service={service} />
					))}
				</tbody>
			</table>
		</div>
	);
}
