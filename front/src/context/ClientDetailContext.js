import { createContext } from 'react';

export const ClientDetailContext = createContext({
	active: 'details',
	setActive: () => {},
	triggerSubmit: null,
	setTriggerSubmit: () => {},
});
