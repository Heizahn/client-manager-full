export default function allowedAmount(e) {
	let value = e.target.value;

	if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
		value = value.substring(1); // Eliminar el primer carácter (el '0')
	}

	// Si el usuario escribe un punto como primer carácter, agrega un '0' antes
	if (value === '.') {
		e.target.value = '0.';
		return;
	}

	const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/; // Expresión regular para permitir el formato deseado

	if (!regex.test(value)) {
		e.target.value = value.slice(0, -1); // Eliminar el último carácter ingresado si no cumple
	}

	e.target.value = value;
}
