import ServiceRow from './service-row';

export default function ServiceTable({ services }) {
  return (
    <div className="max-h-[calc(100vh_-_5.7rem)] overflow-y-auto scrollbar-none rounded-b-md">
      <table className="w-full bg-gray-800 ">
        <thead className="sticky top-0 bg-gray-800 mt-2">
          <tr className="text-left text-lg">
            <th className="pl-4 py-2">Nombre</th>
            <th>Tipo</th>
            <th>Clientes</th>
            <th>Costo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
