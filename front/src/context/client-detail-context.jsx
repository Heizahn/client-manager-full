import { createContext, useContext, useState, useEffect } from 'react';

const ClientDetailContext = createContext({
  view: {
    details: true,
    services: false,
    payments: false,
    statistics: false,
  },
  setView: (view) => {},
});

export const ClientDetailProvider = ({ children }) => {
  const [view, setView] = useState({
    details: true,
    services: false,
    payments: false,
    statistics: false,
  });

  useEffect(() => {
    setView({
      details: true,
      services: false,
      payments: false,
      statistics: false,
    });
  }, []);

  return (
    <ClientDetailContext.Provider value={{ view, setView }}>
      {children}
    </ClientDetailContext.Provider>
  );
};

export const useClientDetail = () => useContext(ClientDetailContext);
