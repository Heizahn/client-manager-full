import { formatDate } from '../../hooks/format-date';
import { formatMoney } from '../../hooks/format-money';
import { PropTypes } from 'prop-types';

RouterRow.propTypes = {
	service: PropTypes.object.isRequired,
};

export default function RouterRow({ service }) {
	const handlerClick = (id) => {
		alert(id);
	};

	return (
		<>
			<tr
				onClick={() => handlerClick(service.id)}
				className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'
			>
				<td className='text-left py-1 pl-4'>{service.nombre_service}</td>
				<td>{formatDate(new Date(service.created_at))}</td>
				<td>{service.created_by?.nombre}</td>
				<td>{service.tipo}</td>
				<td>{service.clients.length}</td>
				<td>{formatMoney(service.costo)}</td>
				<td className={`${!service.estado ? 'text-red-500' : 'text-green-500'}`}>
					{service.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
