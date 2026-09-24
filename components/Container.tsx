/**
 * Shipping-container shell: corrugated side wall, top/bottom rails, four ISO
 * corner castings and a stencilled ISO 6346 marking with a real check digit.
 */

const LETTER_VALUES: Record<string, number> = (() => {
  // ISO 6346: A=10, skipping multiples of 11 (11, 22, 33)
  const map: Record<string, number> = {};
  let v = 10;
  for (const ch of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    if (v % 11 === 0) v++;
    map[ch] = v++;
  }
  return map;
})();

export function isoCheckDigit(owner: string, serial: string) {
  const code = owner + serial;
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const val = /\d/.test(c) ? Number(c) : LETTER_VALUES[c];
    sum += val * 2 ** i;
  }
  return (sum % 11) % 10;
}

export function Marking({
  owner = "PFLU",
  serial,
  type,
  className = "",
}: {
  owner?: string;
  serial: string;
  type: string;
  className?: string;
}) {
  const check = isoCheckDigit(owner, serial);
  return (
    <div
      aria-hidden
      className={`select-none font-stencil leading-none tracking-[0.08em] text-fg/80 ${className}`}
    >
      <div className="flex items-center gap-2 text-lg sm:text-xl">
        <span>{owner}</span>
        <span>{serial}</span>
        <span className="inline-flex h-[1.35em] w-[1.35em] items-center justify-center border-2 border-current text-[0.9em]">
          {check}
        </span>
      </div>
      <div className="mt-1.5 text-right text-sm sm:text-base">{type}</div>
    </div>
  );
}

type Paint = "navy" | "rust" | "green" | "steel" | "reefer";

export function Container({
  paint = "steel",
  serial,
  type,
  className = "",
  children,
  ...rest
}: {
  paint?: Paint;
  serial?: string;
  type?: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`box box-${paint} ${className}`} {...rest}>
      <span className="casting tl" aria-hidden />
      <span className="casting tr" aria-hidden />
      <span className="casting bl" aria-hidden />
      <span className="casting br" aria-hidden />
      {serial && type && <Marking serial={serial} type={type} className="absolute right-6 top-6 hidden lg:block" />}
      {children}
    </div>
  );
}
