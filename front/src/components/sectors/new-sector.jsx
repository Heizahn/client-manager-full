import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InitialValues, schemaValidate } from './schema-validate';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ButtonSubmit from '../button-submit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchPost } from '../../hooks/useFetch';
import { useAuth } from '../../context/auth-context';

export default function NewSector({ setShow }) {
	const [loading, setLoading] = useState(false);
	const clientQuery = useQueryClient();
	const { user } = useAuth();

	const mutation = useMutation({
		mutationFn: (data) => useFetchPost('/api/sectors', data),
		onSuccess: () => {
			toast.success('Sector creado exitosamente');
			clientQuery.invalidateQueries('sectors');
			setLoading(false);
			setShow(false);
		},
		onError: (err) => {
			toast.error(err.message);
			setLoading(false);
		},
	});

	const handleSubmit = (value) => {
		setLoading(true);
		mutation.mutate({
			...value,
			created_by: user,
		});
	};

	return (
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50  flex items-center justify-center z-20'>
			<Formik
				initialValues={InitialValues}
				onSubmit={handleSubmit}
				validationSchema={schemaValidate}
			>
				<Form className='flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 w-72 pb-8'>
					<div className='flex flex-row items-center justify-end mt-2'>
						<button
							onClick={() => setShow(false)}
							className='py-1 px-2 flex flex-row items-center justify-center rounded-md text-white hover:bg-gray-800 transition-all duration-150 ease-linear'
						>
							X
						</button>
					</div>
					<h3 className='text-2xl font-bold text-center mb-3'>Nuevo Sector</h3>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='nombre_sector'>
							Nombre:{' '}
							<span className='text-red-500'>
								<ErrorMessage name='nombre_sector' />
							</span>
						</label>
						<Field
							type='text'
							name='nombre_sector'
							id='nombre_sector'
							placeholder='Nombre'
							className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
						/>
					</div>
					<ButtonSubmit loading={loading}>Crear</ButtonSubmit>
				</Form>
			</Formik>
		</div>
	);
}
