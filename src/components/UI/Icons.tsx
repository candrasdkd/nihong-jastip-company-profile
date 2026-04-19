import React, { JSX } from 'react';

export const MailIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
    <polyline points="3,7 12,13 21,7" />
  </svg>
);

export const PhoneIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
    <circle cx="12" cy="18" r="1" />
  </svg>
);

export const MapPinIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="10" r="3" />
    <path d="M12 13 L9 19 H15 Z" />
  </svg>
);

export const ClockIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
