import { ClientDetailProvider } from '../context/client-detail-context';
import ClientHeader from '../components/client/header';

export default function ClientDetail() {
  return (
    <main className="flex flex-col md:overflow-hidden">
      <ClientDetailProvider>
        <ClientHeader
          clientStatus={{
            estado: true,
            saldo: 1000,
            nombre: 'Test',
            direccion: '10.123456, 10.123456',
          }}
        />
      </ClientDetailProvider>
    </main>
  );
}
