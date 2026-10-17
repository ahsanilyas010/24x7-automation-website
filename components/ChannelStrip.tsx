import { CH, CH_ORDER, ChannelKey } from './data';
import { Icon } from './motion';

/**
 * The site's central idea in one row: every channel on the left, one dashboard on the right.
 * `only` highlights a subset (used on industry pages); `label` overrides the hub text.
 */
export default function ChannelStrip({ dark, only, label = 'One dashboard' }: { dark?: boolean; only?: ChannelKey[]; label?: string }) {
  const keys = only && only.length ? only : CH_ORDER;
  return (
    <div className={`chstrip${dark ? ' dark' : ''}`} role="group" aria-label={`${keys.map((k) => CH[k].l).join(', ')} all in one dashboard`}>
      <div className="chstrip-chips">
        {keys.map((k, i) => (
          <span key={k} className="chstrip-chip" style={{ ['--c' as string]: CH[k].c, ['--t' as string]: CH[k].t, ['--i' as string]: i }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: dark ? 'transparent' : '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon k={k} s={14} c={dark ? '#EEEAE2' : CH[k].c} /></span>
            {CH[k].l}
          </span>
        ))}
      </div>
      <span className="chstrip-hub">
        <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }} aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        {label}
      </span>
    </div>
  );
}
