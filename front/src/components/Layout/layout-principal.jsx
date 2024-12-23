import { Link, useResolvedPath } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../context/useAuth';
import PropTypes from 'prop-types';

function LayoutPrincipal({ children }) {
	return (
		<main className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
			<div className='w-full flex-none md:w-64'>
				<SideNav />
			</div>
			<div className='flex-grow pl-1 pr-3 pt-0 md:overflow-y-auto '>
				<div className='w-full pt-4'>{children}</div>
			</div>
		</main>
	);
}

LayoutPrincipal.propTypes = {
	children: PropTypes.node.isRequired,
};

export default LayoutPrincipal;

function SideNav() {
	const { logout, user } = useAuth();

	return (
		<div className='flex h-full flex-col px-3 py-4 md:px-2'>
			<Link
				to='/'
				className='mb-2 flex h-20 justify-center rounded-md bg-gray-800 p-4 md:h-40'
			>
				<div className='flex flex-col justify-center'>
					<h1 className='text-white font-bold text-2xl tex'>Clientes LV</h1>

					<span className='text-white text-lg'>{user.nombre} </span>
				</div>
			</Link>
			<div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
				<NavLinks />
				{/* <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div> */}
				<div className='w-full'>
					<Button
						className='w-full'
						variant='contained'
						color='error'
						onClick={logout}
					>
						Cerrar sesión
					</Button>
				</div>
			</div>
		</div>
	);
}

function NavLinks() {
	return (
		<div className='flex flex-col space-y-2'>
			<NavLink href='/clients' title='Clientes' name='clients' />
			<NavLink href='/services' title='Servicios' name='services' />
			<NavLink href='/sectors' title='Sectores' name='sectors' />
			<NavLink href='/routers' title='Routers' name='routers' />
		</div>
	);
}

function NavLink({ href, title }) {
	const { pathname } = useResolvedPath(window.location.pathname);

	const isActive = pathname === href;
	return (
		<Link
			to={href}
			className={`flex h-12 items-center justify-center rounded-md ${
				isActive ? 'bg-gray-800' : 'bg-gray-700'
			}  px-4 text-white hover:bg-gray-800`}
		>
			{title}
		</Link>
	);
}

NavLink.propTypes = {
	href: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};
