export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#16213a" stroke="#2a3754" />
      {/* leaf / flow mark */}
      <path
        d="M9 21c0-7 5.5-11.5 14-12-0.5 8.5-5 14-12 14"
        stroke="#22c55e"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 23l6.5-6.5" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
