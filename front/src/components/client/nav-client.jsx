import { useClientDetail } from '../../context/client-detail-context';

export default function NavCliente() {
  const {
    view: { details, invoices, payments, statistics },
    setView,
  } = useClientDetail();

  return (
    <nav className="px-4 py-2 mt-4 ">
      <ul className="flex flex-row gap-8 text-base font-bold mb-2">
        <li>
          <button
            type="button"
            onClick={() => {
              setView({
                invoices: false,
                payments: false,
                statistics: false,
                details: true,
              });
            }}
            className={
              details
                ? 'underline underline-offset-8'
                : 'hover:underline hover:underline-offset-8'
            }
          >
            Detalles del Cliente
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setView({
                details: false,
                payments: false,
                statistics: false,
                invoices: true,
              });
            }}
            className={
              invoices
                ? 'underline underline-offset-8'
                : 'hover:underline hover:underline-offset-8'
            }
          >
            Cuentas Por Cobrar
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setView({
                details: false,
                invoices: false,
                statistics: false,
                payments: true,
              });
            }}
            className={
              payments
                ? 'underline underline-offset-8'
                : 'hover:underline hover:underline-offset-8'
            }
          >
            Pagos
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setView({
                details: false,
                invoices: false,
                payments: false,
                statistics: true,
              });
            }}
            className={
              statistics
                ? 'underline underline-offset-8'
                : 'hover:underline hover:underline-offset-8'
            }
          >
            Estadísticas
          </button>
        </li>
      </ul>
    </nav>
  );
}
