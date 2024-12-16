import * as yup from 'yup';

export const schemaValidate = yup.object({
	nombre: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.matches(/^[a-zA-ZóÑñáéíóúáéíóúñçÁÉÍÓÚÑÇ]+$/, 'Solo un nombre'),
	apellido: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.matches(/^[a-zA-ZóÑñáéíóúáéíóúñçÁÉÍÓÚÑÇ]+$/, 'Solo un apellido'),

	identificacion: yup
		.string()
		.required('*')
		.matches(/^[E|V]-[0-9]{6,9}$/, 'Formato incorrecto'),
	telefono: yup
		.string()
		.required('*')
		.matches(/^[0-9]{9,12}$/, 'Formato incorrecto'),
	sector: yup.string().required('*'),
	direccion: yup
		.string()
		.required('*')
		// matchaer solo coordenadas de google maps (10.079036, -67.773478)
		.matches(
			/^-?[0-9]{1,2}\.[0-9]{1,7}\, -?[0-9]{1,2}\.[0-9]{1,7}$/,
			'Formato incorrecto',
		),
	router: yup.string().required('*'),
	part1: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),

	part2: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),

	part3: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),

	part4: yup
		.string()
		.required('*')
		.min(1, '*')
		.max(3, '*')
		.matches(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])$/, '*'),
	plan: yup.string().required('*'),
	dia_corte: yup.number().required('*'),
});

export const InitialValues = {
	nombre: '',
	apellido: '',
	identificacion: '',
	telefono: '',
	sector: '',
	direccion: '',
	router: '',
	part1: '',
	part2: '',
	part3: '',
	part4: '',
	plan: '',
	dia_corte: '6',
};