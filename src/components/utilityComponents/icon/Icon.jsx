// components/Icon.jsx
'use client';

export default function Icon({ name, className = "w-4 h-4 md:w-6 md:h-6", colorClass = "" }) {
  if (!name) return null;

  const src = `/icons/${name}.svg`;

  return <img src={src} alt={name} className={`${className} ${colorClass}`} />;
}
