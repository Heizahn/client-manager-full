import { Link } from 'react-router-dom';

export default function LinkGoogleMaps({ direccion, children }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${direccion}`}
      target="_blank"
      className="text-blue-400 hover:underline hover:underline-offset-4"
    >
      {children}
    </Link>
  );
}
