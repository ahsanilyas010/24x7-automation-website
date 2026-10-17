/** The 24x7 mark. With `live`, the clock hands keep moving and the accent dot orbits the dial. */
export default function Logo({ size, ink, accent, live }: { size: number; ink: string; accent: string; live?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={live ? 'logo-live' : undefined} style={{ display: 'block', flex: 'none' }} aria-hidden="true">
      <circle className="logo-ring" cx="24" cy="24" r="17" fill="none" stroke={ink} strokeWidth="5" strokeDasharray="89 18" transform="rotate(-50 24 24)" strokeLinecap="round" />
      <g className="logo-orbit"><circle cx="35.2" cy="11.3" r="3.6" fill={accent} /></g>
      <path className="logo-hour" d="M24 24l6 4" stroke={ink} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path className="logo-min" d="M24 24V14" stroke={ink} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
