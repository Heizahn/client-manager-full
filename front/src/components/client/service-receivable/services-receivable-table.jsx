import PropTypes from 'prop-types';
import ServiceReceivableRow from './service-receivable-row';
import { useClientDetail } from '../../../context/useClientDetail';
import { useAuth } from '../../../context/useAuth';
import { useEffect, useState, useCallback } from 'react';
import NewServiceReceivable from '../../Forms/service-receivable/new-service-receivable';

ServiceReceivableTable.propTypes = {
	servicesReceivables: PropTypes.array.isRequired,
	clientId: PropTypes.string.isRequired,
};

export default function ServiceReceivableTable({ servicesReceivables, clientId }) {
	const { active } = useClientDetail();
	const { user } = useAuth();
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const filterServices = useCallback(() => {
		if (search === '') {
			return servicesReceivables;
		}
		return servicesReceivables.filter((serviceReceivable) =>
			serviceReceivable.motivo.toLowerCase().includes(search.toLowerCase()),
		);
	}, [search, servicesReceivables]);

	useEffect(() => {
		filterServices();
	}, [filterServices]);
	return (
		active === 'invoices' && (
			<div className='w-full max-h-[calc(100vh_-_22rem)] overflow-y-auto scrollbar-none rounded-b-md bg-gray-800 '>
				<div className='flex justify-between items-center px-4 py-2'>
					<h2 className='text-lg font-bold text-center'>Cuentas por cobrar</h2>
					<div className='flex justify-end items-center gap-2'>
						<input
							type='text'
							placeholder='Buscar cuenta'
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
							{show && (
								<NewServiceReceivable
									clientId={clientId}
									setShow={setShow}
									userId={user.id}
								/>
							)}
						</>
					</div>
				</div>
				<table className='w-full'>
					<thead className='sticky top-0 bg-gray-800 mt-2'>
						<tr className='text-left text-lg'>
							<th className='pl-4 py-2'>Motivo</th>
							<th>Fecha Creación</th>
							<th>Monto</th>
							<th>Deuda</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{filterServices().length === 0 && (
							<tr>
								<td colSpan='5' className='pl-4 py-2 text-lg'>
									No hay servicios pendientes
								</td>
							</tr>
						)}
						{filterServices().map((serviceReceivable) => (
							<ServiceReceivableRow
								key={serviceReceivable.id}
								serviceReceivable={serviceReceivable}
							/>
						))}
					</tbody>
				</table>
			</div>
		)
	);
}
