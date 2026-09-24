/** Decorative port skyline: stacked containers and a ship-to-shore gantry crane. */

const PAINTS = ["#1b3858", "#7f2d14", "#1d4a32", "#323d4b", "#c8d0d7", "#8a5a12"];

// [column, row, width in 20ft units, paint index]
const STACK: [number, number, number, number][] = [
  [0, 0, 2, 0], [2, 0, 2, 1], [4, 0, 1, 2], [5, 0, 2, 4], [7, 0, 2, 3], [9, 0, 1, 5], [10, 0, 2, 0], [12, 0, 2, 2],
  [0, 1, 2, 3], [2, 1, 1, 5], [3, 1, 2, 4], [5, 1, 2, 1], [8, 1, 2, 0], [10, 1, 2, 4], [12, 1, 1, 1],
  [1, 2, 2, 2], [3, 2, 2, 0], [5, 2, 1, 4], [8, 2, 2, 3], [10, 2, 2, 1],
  [3, 3, 2, 4], [9, 3, 2, 2],
];

const U = 40; // width of a 20ft unit
const H = 26; // container height

export function ContainerStack({ className = "" }: { className?: string }) {
  const width = 14 * U;
  const height = 5 * H + 150;
  const base = height - 4;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="ribs" width="5" height="10" patternUnits="userSpaceOnUse">
          <rect width="2" height="10" fill="rgba(0,0,0,0.22)" />
        </pattern>
      </defs>

      {/* gantry crane */}
      <g stroke="#3a4554" strokeWidth="5" fill="none" strokeLinecap="square">
        <path d={`M${7 * U} ${base} V${base - 5 * H - 110} M${12 * U} ${base} V${base - 5 * H - 110}`} />
        <path d={`M${6 * U - 60} ${base - 5 * H - 100} H${width}`} strokeWidth="7" />
        <path d={`M${7 * U} ${base - 5 * H - 60} L${12 * U} ${base - 5 * H - 100} M${7 * U} ${base - 5 * H - 100} L${12 * U} ${base - 5 * H - 60}`} strokeWidth="2.5" />
      </g>
      <line x1={9 * U + 20} y1={base - 5 * H - 100} x2={9 * U + 20} y2={base - 5 * H - 22} stroke="#3a4554" strokeWidth="2" />
      <rect x={9 * U - 4} y={base - 5 * H - 22} width={2 * U - 8} height={H} fill="#fbbf24" opacity="0.9" />
      <rect x={9 * U - 4} y={base - 5 * H - 22} width={2 * U - 8} height={H} fill="url(#ribs)" />

      {STACK.map(([c, r, w, p], i) => {
        const x = c * U + 1;
        const y = base - (r + 1) * H;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w * U - 2} height={H - 2} fill={PAINTS[p]} />
            <rect x={x} y={y} width={w * U - 2} height={H - 2} fill="url(#ribs)" />
            <rect x={x} y={y} width={w * U - 2} height="3" fill="rgba(0,0,0,0.25)" />
          </g>
        );
      })}
      <rect x="0" y={base} width={width} height="4" fill="#313b49" />
    </svg>
  );
}
