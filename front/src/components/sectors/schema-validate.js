import * as yup from 'yup';

export const schemaValidate = yup.object({
	nombre: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.matches(/^[a-zA-Z_óÑñáéíóúáéíóúñçÁÉÍÓÚÑÇ]+$/, 'Solo un nombre'),
});

export const InitialValues = {
	nombre: '',
};
