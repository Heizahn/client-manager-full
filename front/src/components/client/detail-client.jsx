import { useClientDetail } from '../../context/client-detail-context';
import DetailContainer from './detail-container';
import Detail from './detail';
import { formatMoney } from '../../hooks/format-money';
import { formatDate } from '../../hooks/format-date';

export default function DetailClient({ client }) {
  const {
    view: { details },
  } = useClientDetail();

  return (
    details &&
    (client ? (
      <div className="flex flex-wrap bg-gray-800 px-4 pb-8 pt-4 rounded-b-md">
        <div className="w-72 lg:w-1/3 px-4 py-2 flex flex-col gap-1">
          <DetailContainer title="Datos Personales">
            <Detail title="Nombre:" label={client.nombre} />
            <Detail title="Cedula:" label={client.identificacion} />
          </DetailContainer>
        </div>
        <div className="w-72 lg:w-1/3 px-4 py-2">
          <DetailContainer title="Contacto">
            <Detail
              title="Teléfono:"
              label={client.telefono}
              href={`https://wa.me/${client.telefono.replace('0', '58')}`}
            />
          </DetailContainer>
        </div>
        <div className="w-72 lg:w-1/3 px-4 py-2">
          <DetailContainer title="Ubicación">
            <Detail title="Sector:" label={client.sector.nombre_sector} />
            <Detail
              title="Dirección:"
              label={client.direccion}
              href={`https://www.google.com/maps/search/?api=1&query=${client.direccion}`}
            />
          </DetailContainer>
        </div>
        <div className="w-72 lg:w-1/3 px-4 py-2">
          <DetailContainer title="Servicios">
            <Detail title="Router:" label={client.router.nombre} />
            <Detail
              title="IPV4:"
              label={client.ipv4}
              href={`http://${client.ipv4}`}
            />
            <Detail title="Plan:" label={client.plan.nombre_service} />
          </DetailContainer>
        </div>
        <div className="w-72 lg:w-1/3 px-4 py-2">
          <DetailContainer title="Balance">
            <Detail
              title="Saldo:"
              label={`${formatMoney(client.saldo)}$`}
              className={client.saldo < 0 ? 'text-red-500' : 'text-green-500'}
            />
            <Detail title="Dia de Corte:" label={String(client.dia_corte)} />
          </DetailContainer>
        </div>
        <div className="w-72 lg:w-1/3 px-4 py-2">
          <DetailContainer title="Estado">
            <Detail
              title="Estado:"
              label={`${client.estado ? 'Activo' : 'Suspendido'}`}
              className={
                !client.estado
                  ? 'text-red-500'
                  : client.saldo < 0
                    ? 'text-orange-500'
                    : 'text-green-500'
              }
            />
            <Detail
              title="Fecha de Creación:"
              label={formatDate(new Date(client.created_at))}
            />
            <Detail title="Creado por:" label={client.created_by.nombre} />
          </DetailContainer>
        </div>
      </div>
    ) : null)
  );
}
