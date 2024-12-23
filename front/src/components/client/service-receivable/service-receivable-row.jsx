import { formatDate } from '../../../hooks/format-date';
import { formatMoney } from '../../../hooks/format-money';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ServiceReceivableDetail from './service-receivable-details';

ServiceReceivableRow.propTypes = {
	serviceReceivable: PropTypes.shape({
		id: PropTypes.number.isRequired,
		created_at: PropTypes.string.isRequired,
		monto: PropTypes.number.isRequired,
		deuda: PropTypes.number.isRequired,
		estado: PropTypes.bool.isRequired,
		motivo: PropTypes.string.isRequired,
	}).isRequired,
};

export default function ServiceReceivableRow({ serviceReceivable }) {
	const [show, setShow] = useState(false);
	const showServiceReceivable = () => {
		setShow(!show);
	};
	return (
		<>
			<tr className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'>
				<td onClick={showServiceReceivable} className='text-left py-1 pl-4'>
					{serviceReceivable.motivo}
				</td>
				<td onClick={showServiceReceivable}>
					{formatDate(new Date(serviceReceivable.created_at))}
				</td>
				<td onClick={showServiceReceivable}>{formatMoney(serviceReceivable.monto)}</td>
				<td className={`${serviceReceivable.deuda < 0 ? 'text-red-500' : ''}`}>
					{formatMoney(serviceReceivable.deuda)}
				</td>
				<td
					onClick={showServiceReceivable}
					className={`${
						!serviceReceivable.estado ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{serviceReceivable.estado ? 'Activo' : 'Anulado'}
				</td>
				<td>
					{show && (
						<ServiceReceivableDetail
							serviceReceivable={serviceReceivable}
							setShow={setShow}
						/>
					)}
				</td>
			</tr>
		</>
	);
}
