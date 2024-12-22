import { useClientDetail } from '../../context/client-detail-context';
import DetailContainer from './detail-container';
import Detail from './detail';
import { formatMoney } from '../../hooks/format-money';
import { formatDate } from '../../hooks/format-date';
import { Formik, Form, Field } from 'formik';
import { useRoutersNewClient } from '../../services/routers';
import { useSectorsNewClient } from '../../services/sectors';
import { schemaValidate } from './new-client/validate';
import { identificationToInitials, nameToInitials } from './new-client/functions';
import { useServicesNewClient } from '../../services/services';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchPatch } from '../../hooks/useFetch';
import { toast } from 'react-toastify';

export default function DetailClient({ client }) {
	const {
		view: { details, edit },
		setTriggerSubmit,
		setView,
	} = useClientDetail();

	const { data: routers, isLoading: isLoadingRouters } = useRoutersNewClient();
	const { data: sectors, isLoading: isLoadingSectors } = useSectorsNewClient();
	const { data: services, isLoading: isLoadingServices } = useServicesNewClient();
	const clientQuery = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data) => useFetchPatch(`/api/clients/update/${client.id}`, data),
		onSuccess: () => {
			toast.success('Cliente actualizado exitosamente');
			clientQuery.invalidateQueries(['client', client.id]);
			clientQuery.refetchQueries(['clients', 'sectors', 'services', 'routers']);
			setView({
				details: true,
				edit: false,
				services: false,
				payments: false,
				statistics: false,
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const Submit = (values) => {
		mutation.mutate({
			nombre: values.nombre + ' ' + values.apellido,
			identificacion: values.identificacion,
			telefono: values.telefono,
			direccion: values.direccion,
			sector: values.sector,
			router: values.router,
			ipv4: values.ipv4,
			plan: values.plan,
			dia_corte: Number(values.dia_corte),
		});
	};

	return client ? (
		<Formik
			initialValues={{
				nombre: client.nombre.split(' ')[0],
				apellido: client.nombre.split(' ')[1],
				identificacion: client.identificacion,
				telefono: client.telefono,
				direccion: client.direccion,
				sector: client.sector.id,
				router: client.router.id,
				ipv4: client.ipv4,
				plan: client.plan.id,
				dia_corte: client.dia_corte,
			}}
			validationSchema={Yup.object().shape({
				nombre: schemaValidate.nombre,
				apellido: schemaValidate.apellido,
				identificacion: schemaValidate.identificacion,
				telefono: schemaValidate.telefono,
				direccion: schemaValidate.direccion,
				sector: schemaValidate.sector,
				router: schemaValidate.router,
				ipv4: schemaValidate.ipv4,
				plan: schemaValidate.plan,
				dia_corte: schemaValidate.dia_corte,
			})}
			onSubmit={Submit}
		>
			{({ handleSubmit }) => {
				useEffect(() => {
					setTriggerSubmit(() => handleSubmit);
				}, [handleSubmit, setTriggerSubmit]);

				return (
					<Form>
						<div className='flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md'>
							<div className='w-72 lg:w-1/3 px-4 py-2 flex flex-col gap-1'>
								<DetailContainer title='Datos Personales'>
									{details && (
										<>
											<Detail title='Nombre:' label={client.nombre} />
											<Detail
												title='Cedula:'
												label={client.identificacion}
											/>
										</>
									)}
									{edit && (
										<>
											<Detail title='Nombre:'>
												<div className='grid grid-cols-2 gap-2'>
													<Field
														name='nombre'
														type='text'
														className=' px-2 py-1/3 rounded-md text-black'
														onInput={nameToInitials}
													/>
													<Field
														name='apellido'
														type='text'
														className=' px-2 py-1/3 rounded-md text-black'
														onInput={nameToInitials}
													/>
												</div>
											</Detail>
											<Detail title='Cedula:'>
												<Field
													name='identificacion'
													type='text'
													className='text-black px-2 py-1/3 rounded-md'
													onInput={identificationToInitials}
												/>
											</Detail>
										</>
									)}
								</DetailContainer>
							</div>
							<div className='w-72 lg:w-1/3 px-4 py-2'>
								<DetailContainer title='Contacto'>
									{details && (
										<>
											<Detail
												title='Teléfono:'
												label={client.telefono}
												href={`https://wa.me/${client.telefono.replace('0', '58')}`}
											/>
										</>
									)}
									{edit && (
										<Detail title='Teléfono:'>
											<Field
												name='telefono'
												type='text'
												className='text-black px-2 py-1/3 rounded-md'
											/>
										</Detail>
									)}
								</DetailContainer>
							</div>
							<div className='w-72 lg:w-1/3 px-4 py-2'>
								<DetailContainer title='Ubicación'>
									{details && (
										<>
											<Detail
												title='Sector:'
												label={client.sector.nombre_sector}
											/>
											<Detail
												title='Dirección:'
												label={client.direccion}
												href={`https://www.google.com/maps/search/?api=1&query=${client.direccion}`}
											/>
										</>
									)}

									{edit && (
										<>
											<Detail title='Sector:'>
												<Field
													as='select'
													name='sector'
													className='text-black px-2 py-0.5 rounded-md'
												>
													{isLoadingSectors ? (
														<option value=''>Cargando...</option>
													) : (
														<>
															{sectors.map((sector) => (
																<option
																	key={sector.id}
																	value={sector.id}
																>
																	{sector.nombre_sector}
																</option>
															))}
														</>
													)}
												</Field>
											</Detail>
											<Detail title='Dirección:'>
												<Field
													name='direccion'
													type='text'
													className='text-black px-2 py-1/3 rounded-md'
												/>
											</Detail>
										</>
									)}
								</DetailContainer>
							</div>
							<div className='w-72 lg:w-1/3 px-4 py-2'>
								<DetailContainer title='Servicios'>
									{details && (
										<>
											<Detail
												title='Router:'
												label={client.router.nombre}
											/>
											<Detail
												title='IPV4:'
												label={client.ipv4}
												href={`http://${client.ipv4}`}
											/>
											<Detail
												title='Plan:'
												label={client.plan.nombre_service}
											/>
										</>
									)}
									{edit && (
										<>
											<Detail title='Router: '>
												<Field
													as='select'
													name='router'
													className='text-black px-2 py-1/3 rounded-md'
												>
													{isLoadingRouters ? (
														<option value=''>Cargando...</option>
													) : (
														<>
															{routers.map((router) => (
																<option
																	key={router.id}
																	value={router.id}
																>
																	{router.nombre}
																</option>
															))}
														</>
													)}
												</Field>
											</Detail>
											<Detail title='IPV4: '>
												<Field
													name='ipv4'
													type='text'
													className='text-black px-2 py-1/3 rounded-md'
												/>
											</Detail>
											<Detail title='Plan: '>
												<Field
													as='select'
													name='plan'
													className='text-black px-2 py-1/3 rounded-md'
												>
													{isLoadingServices ? (
														<option value=''>Cargando...</option>
													) : (
														<>
															{services.map((service) => (
																<option
																	key={service.id}
																	value={service.id}
																>
																	{service.tipo}{' '}
																	{service.nombre_service}
																</option>
															))}
														</>
													)}
												</Field>
											</Detail>
										</>
									)}
								</DetailContainer>
							</div>
							<div className='w-72 lg:w-1/3 px-4 py-2'>
								<DetailContainer title='Balance'>
									{(details || edit) && (
										<>
											<Detail
												title='Saldo:'
												label={`${formatMoney(client.saldo)}$`}
												className={
													client.saldo < 0
														? 'text-red-500'
														: 'text-green-500'
												}
											/>
										</>
									)}
									{details && (
										<>
											<Detail
												title='Dia de Corte:'
												label={String(client.dia_corte)}
											/>
										</>
									)}
									{edit && (
										<>
											<Detail title='Dia de Corte:'>
												<Field
													as='select'
													name='dia_corte'
													className='text-black px-2 py-1/3 rounded-md'
												>
													<option value='6'>6</option>
													<option value='17'>17</option>
												</Field>
											</Detail>
										</>
									)}
								</DetailContainer>
							</div>
							<div className='w-72 lg:w-1/3 px-4 py-2'>
								<DetailContainer title='Estado'>
									{(details || edit) && (
										<>
											<Detail
												title='Estado:'
												label={`${client.estado ? 'Activo' : 'Suspendido'}`}
												className={
													!client.estado
														? 'text-red-500'
														: client.saldo < 0
															? 'text-orange-500'
															: 'text-green-500'
												}
											/>
											<Detail
												title='Fecha de Creación:'
												label={formatDate(new Date(client.created_at))}
											/>
											<Detail
												title='Creado por:'
												label={client.created_by.nombre}
											/>
										</>
									)}
								</DetailContainer>
							</div>
						</div>
					</Form>
				);
			}}
		</Formik>
	) : null;
}
