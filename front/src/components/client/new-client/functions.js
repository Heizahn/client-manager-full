export function nameToInitials(e) {
	return e.target.value
		? (e.target.value =
				e.target.value.toLowerCase()[0].toUpperCase() + e.target.value.slice(1))
		: e.target.value;
}

export function identificationToInitials(e) {
	return e.target.value
		? (e.target.value =
				e.target.value.toLowerCase()[0].toUpperCase() + e.target.value.slice(1))
		: e.target.value;
}
