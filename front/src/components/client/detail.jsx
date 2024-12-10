import { Link } from 'react-router-dom';

export default function Details({ title, label, href, className }) {
  return (
    <p className="text-base">
      <strong className="ml-2">{title}</strong>{' '}
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="text-blue-400 hover:underline hover:underline-offset-2"
        >
          {label}
        </Link>
      ) : (
        <span className={className}>{label}</span>
      )}
    </p>
  );
}
