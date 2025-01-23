import PropTypes from 'prop-types';
import PaymentRow from './payment-row';
import { useClientDetail } from '../../../context/useClientDetail';
import { useCallback, useEffect, useState } from 'react';
import NewPay from '../../Forms/payments/new-pay';

PaymentsTable.propTypes = {
	paymentClient: PropTypes.array.isRequired,
	clientId: PropTypes.string.isRequired,
};

export default function PaymentsTable({ paymentClient, clientId }) {
	const { active } = useClientDetail();
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const filterPayments = useCallback(() => {
		if (search === '') {
			return paymentClient;
		}
		return paymentClient.filter((payment) =>
			payment.motivo.toLowerCase().includes(search.toLowerCase()),
		);
	}, [search, paymentClient]);

	useEffect(() => {
		filterPayments();
	}, [filterPayments]);
	return (
		active === 'payments' && (
			<div className='bg-gray-800 w-full max-h-[calc(100vh_-_17.1rem)] overflow-y-auto scrollbar-none rounded-b-md'>
				<div className='flex justify-between items-center px-4 py-2 bg-gray-800 z-10'>
					<h2 className='text-lg font-bold text-center'>Pagos</h2>
					<div className='flex justify-end items-center gap-2'>
						<input
							type='text'
							placeholder='Buscar pago'
							className='px-4 py-1 rounded-md text-black'
							onInput={handleSearch}
						/>
						<>
							<button
								className='bg-blue-600 text-white px-4 py-1 rounded-md'
								onClick={() => setShow(true)}
							>
								Agregar
							</button>
							{show && <NewPay clientId={clientId} setShow={setShow} />}
						</>
					</div>
				</div>
				<table className='w-full table-auto '>
					<thead className='sticky top-12 mt-2 bg-gray-800'>
						<tr className='text-left text-lg '>
							<th className='pl-4 py-2'>Motivo</th>
							<th>Fecha Creación</th>
							<th>Tipo de Pago</th>
							<th>Creado Por</th>
							<th>Recibido Por</th>
							<th>Monto (REF)</th>
							<th>Monto (Bs)</th>
							<th>Referencia</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{paymentClient.length === 0 && (
							<tr>
								<td colSpan='8' className='pl-4 py-2 text-lg'>
									No hay pagos
								</td>
							</tr>
						)}
						{paymentClient.map((payment) => (
							<PaymentRow key={payment.id} payment={payment} />
						))}
					</tbody>
				</table>
			</div>
		)
	);
}
