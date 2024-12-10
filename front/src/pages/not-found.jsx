import { Link as RouterLink } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { Link as LinkUI } from '@mui/material';

export default function NotFound() {
	useTitle('No encontrado');
	return (
		<main className='flex h-screen flex-col items-center justify-center'>
			<h1 className='text-6xl font-bold'>404</h1>
			<h2 className='text-2xl font-bold mb-2'>Página no encontrada</h2>
			<RouterLink to='/'>
				<LinkUI className='text-lg' underline='hover' color='primary'>
					Volver al inicio
				</LinkUI>
			</RouterLink>
		</main>
	);
}
