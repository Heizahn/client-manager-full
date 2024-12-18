'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InitialValues, schemaValidate } from './validate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ButtonSubmit from '../../button-submit';
import { useServicesNewClient } from '../../../services/services';
import { useSectorsNewClient } from '../../../services/sectors';
import { useRoutersNewClient } from '../../../services/routers';
import { useAuth } from '../../../context/auth-context';
import { useFetchPost } from '../../../hooks/useFetch';

export default function NewClient({ setShow }) {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);

	const clientQuery = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data) => useFetchPost('/api/clients', data),
		onSuccess: () => {
			toast.success('Cliente creado exitosamente');
			clientQuery.invalidateQueries('clients');
			setLoading(false);
			setShow(false);
		},
		onError: (err) => {
			toast.error(err.message);
			setLoading(false);
		},
	});

	const handlerSubmit = (values) => {
		setLoading(true);
		const data = {
			created_by: user.id,
			nombre: values.nombre + ' ' + values.apellido,
			telefono: values.telefono,
			identificacion: values.identificacion,
			direccion: values.direccion,
			sector: values.sector,
			router: values.router,
			plan: values.plan,
			dia_corte: Number(values.dia_corte),
			ipv4: `${values.part1}.${values.part2}.${values.part3}.${values.part4}`,
		};

		mutation.mutate(data);
	};

	const {
		data: dataServices,
		isLoading: isLoadingServices,
		error: errorServices,
	} = useServicesNewClient();
	const {
		data: dataSectors,
		isLoading: isLoadingSectors,
		error: errorSectors,
	} = useSectorsNewClient();
	const {
		data: dataRouters,
		isLoading: isLoadingRouters,
		error: errorRouters,
	} = useRoutersNewClient();

	return (
		<div className='absolute top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-20'>
			<Formik
				initialValues={InitialValues}
				onSubmit={handlerSubmit}
				validationSchema={schemaValidate}
			>
				<Form className='flex flex-col justify-center border-2 border-gray-400 bg-gray-800 rounded-lg px-4 w-[420px] pb-8'>
					<div className='flex flex-row items-center justify-end mt-2'>
						<button
							onClick={() => setShow(false)}
							className='py-1 px-2 flex flex-row items-center justify-center rounded-md text-white hover:bg-gray-800 transition-all duration-150 ease-linear'
						>
							X
						</button>
					</div>
					<h3 className='text-2xl font-bold text-center mb-3'>Nuevo Cliente</h3>
					<div className='flex flex-row gap-4 mb-3'>
						<div className='w-full flex flex-col gap-1'>
							<label htmlFor='nombre'>
								Nombre:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='nombre' />
								</span>
							</label>
							<Field
								type='text'
								name='nombre'
								id='nombre'
								placeholder='Juan'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
								onInput={(e) =>
									e.target.value
										? (e.target.value =
												e.target.value.toLowerCase()[0].toUpperCase() +
												e.target.value.slice(1))
										: e.target.value
								}
							/>
						</div>
						<div className='w-full flex flex-col gap-1'>
							<label htmlFor='apellido'>
								Apellido:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='apellido' />
								</span>
							</label>
							<Field
								type='text'
								name='apellido'
								id='apellido'
								placeholder='Perez'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
								onInput={(e) =>
									e.target.value
										? (e.target.value =
												e.target.value.toLowerCase()[0].toUpperCase() +
												e.target.value.slice(1))
										: e.target.value
								}
							/>
						</div>
					</div>
					<div className='flex flex-row gap-4 mb-3'>
						<div className='w-2/5 flex flex-col gap-1'>
							<label htmlFor='identificacion'>
								Identificacion:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='identificacion' />
								</span>
							</label>
							<Field
								type='text'
								name='identificacion'
								id='identificacion'
								placeholder='V-12345678'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
								onInput={(e) =>
									e.target.value
										? (e.target.value =
												e.target.value.toLowerCase()[0].toUpperCase() +
												e.target.value.slice(1))
										: e.target.value
								}
							/>
						</div>
						<div className='w-3/5 flex flex-col gap-1'>
							<label htmlFor='telefono'>
								Telefono:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='telefono' />
								</span>
							</label>
							<Field
								type='text'
								name='telefono'
								placeholder='584144271554'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							/>
						</div>
					</div>

					<div className='flex flex-row gap-4 mb-3'>
						<div className='w-3/5 flex flex-col gap-1'>
							<label htmlFor='direccion'>
								Direccion:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='direccion' />
								</span>
							</label>
							<Field
								type='text'
								name='direccion'
								id='direccion'
								placeholder='10.0851067, -67.8063029'
								className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
							/>
						</div>
						<div className='w-2/5 flex flex-col gap-1'>
							<label htmlFor='sector'>
								Sector:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='sector' />
								</span>
							</label>
							<Field
								as='select'
								name='sector'
								id='sector'
								className='w-full rounded-md px-2 py-[0.4rem] outline-2 outline-gray-600 text-gray-950 scrollbar-none'
							>
								{isLoadingSectors ? (
									<option value=''>Cargando...</option>
								) : errorSectors ? (
									<option value=''>Error al obtener los sectores</option>
								) : (
									<>
										<option value=''>Seleccione...</option>
										{dataSectors.map((sector) => (
											<option key={sector.id} value={sector.id}>
												{sector.nombre_sector}
											</option>
										))}
									</>
								)}
							</Field>
						</div>
					</div>

					<div className='flex flex-row gap-4 mb-3'>
						<div className='w-2/5 flex flex-col gap-1'>
							<label htmlFor='router'>
								Router:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='router' />
								</span>
							</label>
							<Field
								as='select'
								name='router'
								id='router'
								className='w-full rounded-md px-2 py-[0.4rem] outline-2 outline-gray-600 text-gray-950 scrollbar-none'
							>
								{isLoadingRouters ? (
									<option value=''>Cargando...</option>
								) : errorRouters ? (
									<option value=''>Error al obtener los routers</option>
								) : (
									<>
										<option value=''>Seleccione...</option>

										{dataRouters.map((router) => (
											<option key={router.id} value={router.id}>
												{router.nombre}
											</option>
										))}
									</>
								)}
							</Field>
						</div>
						<div className='w-3/5 flex flex-col gap-1'>
							<label>
								IP:{' '}
								<span className='text-red-500'>
									<ErrorMessage name='part1' />
								</span>{' '}
								<span className='text-red-500'>
									<ErrorMessage name='part2' />
								</span>{' '}
								<span className='text-red-500'>
									<ErrorMessage name='part3' />
								</span>{' '}
								<span className='text-red-500'>
									<ErrorMessage name='part4' />
								</span>
							</label>
							<div className='flex items-end gap-0.5'>
								<Field
									name='part1'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='192'
									maxLength={3}
									minLength={1}
									id='part1'
									onInput={(e) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyDown={(e) => {
										if (
											e.key === '.' &&
											e.currentTarget.value.length >=
												e.currentTarget.minLength
										) {
											document.getElementById('part2')?.focus();
										} else if (
											e.key === '.' &&
											e.currentTarget.value === ''
										) {
											e.preventDefault();
										}
									}}
									onKeyUp={(e) => {
										if (e.target.value.length === 3) {
											e.preventDefault();
											document.getElementById('part2')?.focus();
										}
									}}
								/>
								.
								<Field
									name='part2'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='168'
									maxLength={3}
									minLength={1}
									id='part2'
									onInput={(e) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyDown={(e) => {
										if (
											e.key === '.' &&
											e.currentTarget.value.length >= 1
										) {
											document.getElementById('part3')?.focus();
										} else if (
											e.key === '.' &&
											e.currentTarget.value === ''
										) {
											e.preventDefault();
										}
									}}
									onKeyUp={(e) => {
										if (e.currentTarget.value.length >= 3) {
											document.getElementById('part3')?.focus();
										}
										if (
											e.key === 'Backspace' &&
											e.currentTarget.value === ''
										) {
											document.getElementById('part1')?.focus();
										}
									}}
								/>
								.
								<Field
									name='part3'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='1'
									maxLength={3}
									minLength={1}
									id='part3'
									onInput={(e) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyDown={(e) => {
										if (
											e.key === '.' &&
											e.currentTarget.value.length >=
												e.currentTarget.minLength
										) {
											document.getElementById('part4')?.focus();
										} else if (
											e.key === '.' &&
											e.currentTarget.value === ''
										) {
											e.preventDefault();
										}
									}}
									onKeyUp={(e) => {
										if (e.currentTarget.value.length === 3) {
											e.preventDefault();
											document.getElementById('part4')?.focus();
										}
										if (
											e.key === 'Backspace' &&
											e.currentTarget.value === ''
										) {
											document.getElementById('part2')?.focus();
										}
									}}
								/>
								.
								<Field
									name='part4'
									className='w-full rounded-md px-2 py-1 outline-2 outline-gray-600 text-gray-950'
									placeholder='1'
									maxLength={3}
									minLength={1}
									id='part4'
									onInput={(e) =>
										(e.target.value = e.target.value.replace(
											/[^0-9]/g,
											'',
										))
									}
									onKeyUp={(e) => {
										if (
											e.key === 'Backspace' &&
											e.currentTarget.value === ''
										) {
											document.getElementById('part3')?.focus();
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-row gap-4 mb-3 mt-2'>
						<div className='w-4/6 flex flex-col gap-1'>
							<label htmlFor='plan'>
								Plan:{' '}
								<span className='text-red-500'>
									<ErrorMessage name='plan' />
								</span>
							</label>
							<Field
								as='select'
								name='plan'
								className='rounded-md px-2 py-[0.4rem] outline-2 outline-gray-600 text-gray-950'
							>
								{isLoadingServices ? (
									<option value=''>Cargando...</option>
								) : errorServices ? (
									<option value=''>Error al obtener los servicios</option>
								) : (
									<>
										<option value=''>Seleccione...</option>
										{dataServices.map((service) => (
											<option key={service.id} value={service.id}>
												{service.tipo} {service.nombre_service}
											</option>
										))}
									</>
								)}
							</Field>
						</div>
						<div className='w-2/6 flex flex-col gap-1'>
							<label htmlFor='dia_corte'>
								Dia de Corte:{' '}
								<span className='text-red-500 text-xs'>
									<ErrorMessage name='dia_corte' />
								</span>
							</label>
							<Field
								as='select'
								name='dia_corte'
								className='rounded-md px-2 py-[0.4rem] outline-2 outline-gray-600 text-gray-950'
							>
								<option value='6'>6</option>
								<option value='17'>17</option>
							</Field>
						</div>
					</div>
					<ButtonSubmit loading={loading}>Crear</ButtonSubmit>
				</Form>
			</Formik>
		</div>
	);
}
