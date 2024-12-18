import { useRouters } from '../../services/routers';
import RouterRow from './router-row';

export default function RouterTable() {
	const { data: routers, isLoading, error } = useRouters();

	if (isLoading) return <div>Cargando...</div>;
	if (error) return <div className='ml-4'>Error al cargar</div>;

	return (
		<div className='max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-md mt-1'>
			<table className='w-full bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg'>
						<th className='pl-4 py-2'>Nombre</th>
						<th>IP</th>
						<th>Creado por</th>
						<th>Sector</th>
						<th>Clientes</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{routers.map((router) => (
						<RouterRow key={router.id} router={router} />
					))}
				</tbody>
			</table>
		</div>
	);
}
