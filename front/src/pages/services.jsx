import { useState } from 'react';
import ServiceTable from '../components/services/services-table';
import { useServices } from '../services/services';
import NewService from '../components/services/new-service';
import ShowForm from '../components/show-form';

export default function Services() {
  const [show, setShow] = useState(false);
  const { data, isLoading, error } = useServices();
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);
  return (
    <>
      <div className="flex flex-row justify-between items-center py-2 px-4 rounded-t-md bg-gray-800 ">
        <h2 className="text-center text-2xl font-bold">Servicios</h2>
        <div className="flex flex-row items-center gap-4">
          <ShowForm title="Nuevo Servicio" show={show} setShow={setShow}>
            <NewService setShow={setShow} />
          </ShowForm>
        </div>
      </div>
      <ServiceTable services={data} />
    </>
  );
}
