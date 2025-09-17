import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 3h16a2 2 0 0 1 2 2v6" />
      <path d="M12 21v-9" />
      <path d="M8 12h8" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M2 17h20" />
      <path d="M4 21v-4" />
      <path d="M20 21v-4" />
    </svg>
  );
}
