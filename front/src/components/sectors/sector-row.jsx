import { formatDate } from '../../hooks/format-date';
import PropTypes from 'prop-types';

SectorRow.propTypes = {
	sector: PropTypes.object.isRequired,
};

export default function SectorRow({ sector }) {
	const handlerClick = (id) => {
		alert(id);
	};

	return (
		<>
			<tr
				onClick={() => handlerClick(sector.id)}
				className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'
			>
				<td className='text-left py-1 pl-4'>{sector.nombre_sector}</td>
				<td>{formatDate(new Date(sector.created_at))}</td>
				<td>{sector.created_by?.nombre}</td>
				<td>{sector.clients.length}</td>
				<td className={`${!sector.estado ? 'text-red-500' : 'text-green-500'}`}>
					{sector.estado ? 'Activo' : 'Inactivo'}
				</td>
			</tr>
		</>
	);
}
