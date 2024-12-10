import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { validationSchema } from './validate-form';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth-context';

function LoginForm() {
	const { isLogged, setIsLogged } = useAuth();
	const navigate = useNavigate();
	const initialValues = {
		email: '',
		password: '',
	};

	const onSubmit = (values) => {
		setIsLogged(true);

		localStorage.setItem('token', JSON.stringify(values));
		toast.success('Login exitoso');
	};

	useEffect(() => {
		if (isLogged) {
			navigate('/');
		}
	}, [isLogged]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				onSubmit(values);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, errors, handleChange }) => (
				<Form className='flex flex-col gap-4'>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<TextField
							id='email'
							label={`Correo electrónico ${errors.email ? errors.email : ''}`}
							error={errors.email !== undefined}
							name='email'
							variant='standard'
							onChange={handleChange}
						/>

						<TextField
							id='password'
							label={`Contraseña ${errors.password ? errors.password : ''}`}
							error={errors.password !== undefined}
							name='password'
							type='password'
							variant='standard'
							onChange={handleChange}
						/>
					</Box>
					<Button type='submit' variant='contained' disabled={isSubmitting}>
						Iniciar sesión
					</Button>
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
