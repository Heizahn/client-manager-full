import * as yup from 'yup';

export const schemaValidate = yup.object({
	nombre_sector: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres')
		.matches(/^[a-zA-Z-óÑñáéíóúÁÉÍÓÚÑÇ]+( [a-zA-Z-óÑñáéíóúÁÉÍÓÚÑÇ]+)*$/, 'Solo letras'),
});

export const InitialValues = {
	nombre_sector: '',
};
