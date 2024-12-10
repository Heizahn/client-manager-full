import { Link } from 'react-router-dom';

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mt-2 ml-4 block">
      <ol className="flex text-base">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            aria-current={breadcrumb.active}
            className={`${breadcrumb.active ? 'text-white' : 'text-gray-500'}`}
          >
            {breadcrumb.active ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
            )}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
