import { useClientDetail } from '../../context/useClientDetail';

export default function NavCliente() {
	const { active, setActive } = useClientDetail();

	return (
		<nav className='px-4 py-2 mt-4 '>
			<ul className='flex flex-row gap-8 text-base font-bold mb-2'>
				<li>
					<button
						type='button'
						onClick={() => {
							setActive('details');
						}}
						className={
							active === 'details'
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Detalles del Cliente
					</button>
				</li>
				<li>
					<button
						type='button'
						onClick={() => {
							setActive('invoices');
						}}
						className={
							active === 'invoices'
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Cuentas Por Cobrar
					</button>
				</li>
				<li>
					<button
						type='button'
						onClick={() => {
							setActive('payments');
						}}
						className={
							active === 'payments'
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Pagos
					</button>
				</li>
				<li>
					<button
						type='button'
						onClick={() => {
							setActive('statistics');
						}}
						className={
							active === 'statistics'
								? 'underline underline-offset-8'
								: 'hover:underline hover:underline-offset-8'
						}
					>
						Estadísticas
					</button>
				</li>
			</ul>
		</nav>
	);
}
