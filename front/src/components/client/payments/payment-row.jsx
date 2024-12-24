import { formatDate } from '../../../hooks/format-date';
import { formatMoney } from '../../../hooks/format-money';
import PropTypes from 'prop-types';

PaymentRow.propTypes = {
	payment: PropTypes.shape({
		id: PropTypes.string.isRequired,
		motivo: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		tipo: PropTypes.string.isRequired,
		created_by: PropTypes.shape({
			nombre: PropTypes.string,
		}),
		recibido_por: PropTypes.shape({
			nombre: PropTypes.string,
		}),
		monto_ref: PropTypes.string.isRequired,
		monto_bs: PropTypes.string.isRequired,
		referencia: PropTypes.string.isRequired,
		estado: PropTypes.bool.isRequired,
	}).isRequired,
};

export default function PaymentRow({ payment }) {
	return (
		<tr className='border-t border-gray-400 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-linear'>
			<td className='text-left py-1 pl-4'>{payment.motivo}</td>
			<td>{formatDate(new Date(payment.created_at))}</td>
			<td>{payment.tipo}</td>
			<td>{payment.created_by?.nombre || 'N/A'}</td>
			<td>{payment.recibido_por?.nombre || 'N/A'}</td>
			<td>{'$' + formatMoney(payment.monto_ref)}</td>
			<td>{formatMoney(payment.monto_bs) + ' Bs'}</td>
			<td>{payment.referencia}</td>
			<td className={`${!payment.estado ? 'text-red-500' : 'text-green-500'}`}>
				{payment.estado ? 'Activo' : 'Inactivo'}
			</td>
		</tr>
	);
}
