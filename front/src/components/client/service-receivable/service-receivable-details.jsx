import { formatDate } from '../../../hooks/format-date';
import { formatMoney } from '../../../hooks/format-money';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
// import { anularService } from '@/lib/payments_and_services/invoices/anularService';

ServiceReceivableDetail.propTypes = {
	serviceReceivable: PropTypes.shape({
		id: PropTypes.number.isRequired,
		created_at: PropTypes.string.isRequired,
		monto: PropTypes.number.isRequired,
		deuda: PropTypes.number.isRequired,
		estado: PropTypes.bool.isRequired,
		motivo: PropTypes.string.isRequired,
	}).isRequired,
	setShow: PropTypes.func.isRequired,
};

export default function ServiceReceivableDetail({ serviceReceivable, setShow }) {
	const handleAnular = () => {
		if (confirm('¿Está seguro de anular el servicio?')) {
			toast.info('Anulación de servicio pendiente');
		} else {
			toast.info('Anulación cancelada');
		}
	};
	return (
		<div className='fixed top-0 left-0 h-screen w-screen bg-black/50 z-20 flex items-center cursor-default'>
			<div className='mx-auto bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-6'>
				<header className='flex items-center justify-center px-4 pb-3'>
					<h3 className='text-xl font-bold text-center'>Detalles</h3>
				</header>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-6 justify-between items-center'>
						<h4 className='text-lg font-bold'>Motivo:</h4>
						<p>{serviceReceivable.motivo}</p>
					</div>
					<div className='flex justify-between items-center'>
						<h4 className='text-lg font-bold'>Fecha Creación:</h4>
						<p>{formatDate(new Date(serviceReceivable.created_at))}</p>
					</div>
					<div className='flex justify-between items-center'>
						<h4 className='text-lg font-bold'>Monto:</h4>
						<p>{formatMoney(serviceReceivable.monto)}</p>
					</div>
					<div className='flex justify-between items-center'>
						<h4 className='text-lg font-bold'>Deuda:</h4>
						<p className={`${serviceReceivable.deuda < 0 ? 'text-red-500' : ''}`}>
							{formatMoney(serviceReceivable.deuda)}
						</p>
					</div>
					<div className='flex justify-between items-center'>
						<h4 className='text-lg font-bold'>Estado:</h4>
						<p
							className={`${
								!serviceReceivable.estado ? 'text-red-500' : 'text-green-500'
							}`}
						>{`${serviceReceivable.estado ? 'Activo' : 'Anulado'}`}</p>
					</div>
					<div className='mt-2 flex justify-center items-center gap-6'>
						<button
							onClick={handleAnular}
							className='bg-red-600 px-4 py-1 rounded-md border-1 border-transparent transition-all duration-150 ease-linear active:bg-red-700'
						>
							Anular
						</button>
						<button
							onClick={() => {
								setShow(false);
							}}
							className=' px-4 py-1 rounded-md border-1 border-transparent hover:border-gray-500 hover:bg-gray-700 transition-all duration-150 ease-linear active:shadow-inner'
						>
							Cerrar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
