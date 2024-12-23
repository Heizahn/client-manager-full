import { useEffect, useState, useCallback } from 'react';
import { useClientsContext } from '../../context/useClientsContext';
import PropTypes from 'prop-types';

function NavFilter({ clients }) {
	const [active, setActive] = useState({
		all: true,
		solvent: false,
		defaulter: false,
		suspended: false,
	});
	const { setClients } = useClientsContext();

	const handlerAll = useCallback(() => {
		setClients(clients);
		setActive({
			all: true,
			solvent: false,
			defaulter: false,
			suspended: false,
		});
	}, [clients, setClients]);

	const handlerSolvent = () => {
		setClients(clients.filter((client) => client.saldo >= 0 && client.estado));
		setActive({
			all: false,
			solvent: true,
			defaulter: false,
			suspended: false,
		});
	};

	const handlerDefaulter = () => {
		setClients(clients.filter((client) => client.saldo < 0 && client.estado));
		setActive({
			all: false,
			solvent: false,
			defaulter: true,
			suspended: false,
		});
	};

	const handlerSuspended = () => {
		setClients(clients.filter((client) => client.estado === false));
		setActive({
			all: false,
			solvent: false,
			defaulter: false,
			suspended: true,
		});
	};

	useEffect(() => {
		handlerAll();
	}, [handlerAll]);

	return (
		<nav className='flex flex-row gap-6' aria-label='Filtro de Clientes'>
			<FilterStatus
				title='Todos'
				Count={clients.length}
				isActive={active.all}
				onClick={handlerAll}
			/>
			<FilterStatus
				title='Solventes'
				className='text-green-500'
				Count={clients.filter((client) => client.saldo >= 0 && client.estado).length}
				isActive={active.solvent}
				onClick={handlerSolvent}
			/>
			<FilterStatus
				title='Morosos'
				className='text-orange-500'
				Count={clients.filter((client) => client.saldo < 0 && client.estado).length}
				isActive={active.defaulter}
				onClick={handlerDefaulter}
			/>
			<FilterStatus
				title='Suspendidos'
				className='text-red-500'
				Count={clients.filter((client) => client.estado === false).length}
				isActive={active.suspended}
				onClick={handlerSuspended}
			/>
		</nav>
	);
}

export default NavFilter;
NavFilter.propTypes = {
	clients: PropTypes.array.isRequired,
};

function FilterStatus({ Count, title, onClick, isActive, className }) {
	return (
		<button
			type='button'
			className={`${
				!isActive ? '' : 'underline underline-offset-4'
			} hover:underline underline-offset-4 px-3 ${className}`}
			onClick={onClick}
		>
			{title} {Count}
		</button>
	);
}

FilterStatus.propTypes = {
	Count: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
	className: PropTypes.string,
};
