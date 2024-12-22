import { createContext, useContext, useState, useEffect } from 'react';

const ClientDetailContext = createContext({
	view: {
		details: true,
		edit: false,
		services: false,
		payments: false,
		statistics: false,
	},
	setView: (view) => {},
	triggerSubmit: null,
	setTriggerSubmit: () => {},
});

export const ClientDetailProvider = ({ children }) => {
	const [view, setView] = useState({
		details: true,
		edit: false,
		services: false,
		payments: false,
		statistics: false,
	});
	const [triggerSubmit, setTriggerSubmit] = useState(null);

	useEffect(() => {
		setView({
			details: true,
			services: false,
			edit: false,
			payments: false,
			statistics: false,
		});
	}, []);

	return (
		<ClientDetailContext.Provider
			value={{ view, setView, triggerSubmit, setTriggerSubmit }}
		>
			{children}
		</ClientDetailContext.Provider>
	);
};

export const useClientDetail = () => useContext(ClientDetailContext);
