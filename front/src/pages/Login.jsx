import { useEffect } from 'react';
import LoginForm from '../components/Forms/login/login-form';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

function Login() {
	useTitle('Iniciar sesión');
	const { isLogged } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLogged) {
			navigate('/');
		}
	}, [isLogged, navigate]);

	return (
		<main className='flex flex-col items-center justify-center h-screen'>
			<section className='w-72 border-2 border-black dark:border-white  rounded-lg p-4'>
				<h2 className='text-2xl font-bold mb-4'>Iniciar sesión</h2>
				<LoginForm />
			</section>
		</main>
	);
}

export default Login;
