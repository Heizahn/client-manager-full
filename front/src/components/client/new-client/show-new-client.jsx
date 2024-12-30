import { useState } from 'react';
import NewClient from './new-client';

export default function ShowFormNewClient() {
	const [show, setShow] = useState(false);

	const handleClick = () => {
		setShow(!show);
	};
	return (
		<>
			<button
				onClick={handleClick}
				className='bg-blue-600 text-white px-4 py-0.5 rounded-md hover:bg-blue-700 transition-all duration-300 ease-linear'
			>
				Crear
			</button>
			{show && <NewClient setShow={setShow} />}
		</>
	);
}
