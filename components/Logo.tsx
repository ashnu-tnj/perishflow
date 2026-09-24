export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* container front with corrugation */}
      <rect x="2" y="7" width="28" height="18" fill="#1b3858" />
      <path d="M7 9v14M11 9v14M15 9v14M19 9v14M23 9v14" stroke="#0e1116" strokeOpacity=".45" strokeWidth="1.4" />
      <rect x="2" y="7" width="28" height="2.5" fill="#12263d" />
      <rect x="2" y="22.5" width="28" height="2.5" fill="#12263d" />
      <rect x="1" y="6" width="4" height="3.5" fill="#fbbf24" />
      <rect x="27" y="6" width="4" height="3.5" fill="#fbbf24" />
      <rect x="1" y="22.5" width="4" height="3.5" fill="#fbbf24" />
      <rect x="27" y="22.5" width="4" height="3.5" fill="#fbbf24" />
      {/* leaf */}
      <path d="M11 20c0-5 3.8-8 10-8.5-.4 6-3.6 9.5-8.6 9.5" fill="#22c55e" />
      <path d="M11 21l4.5-4.5" stroke="#0e1116" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
