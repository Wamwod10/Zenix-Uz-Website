import { useId } from 'react';
import './LogoMark.scss';

export default function LogoMark({ compact = false, hero = false, className = '' }) {
  const id=useId().replace(/:/g,'');
  return <span className={`zenix-mark ${compact?'zenix-mark--compact':''} ${hero?'zenix-mark--hero':''} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 96 96" role="presentation">
      <defs>
        <linearGradient id={`glass-${id}`} x1="18" y1="12" x2="80" y2="84" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity=".14"/>
          <stop offset=".48" stopColor="#ffffff" stopOpacity=".035"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity=".08"/>
        </linearGradient>
        <linearGradient id={`z-${id}`} x1="24" y1="25" x2="73" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff"/>
          <stop offset=".52" stopColor="#d8dcde"/>
          <stop offset="1" stopColor="#9ba2a7"/>
        </linearGradient>
      </defs>
      <rect x="6.5" y="6.5" width="83" height="83" rx="24" fill={`url(#glass-${id})`} stroke="#ffffff" strokeOpacity=".16"/>
      <rect x="9" y="9" width="78" height="78" rx="22" fill="none" stroke="#ffffff" strokeOpacity=".04"/>
      <path d="M23.6 30.5 32 22.7 72.3 23.4 52.2 44.1 41.3 43.6 51.2 31Z" fill={`url(#z-${id})`} stroke="#ffffff" strokeOpacity=".28" strokeWidth=".6" strokeLinejoin="round"/>
      <path d="M17.7 67.5 64 68.5 72.3 60.5 39 59.8 47.6 49.3 36.2 48.4Z" fill={`url(#z-${id})`} stroke="#ffffff" strokeOpacity=".28" strokeWidth=".6" strokeLinejoin="round"/>
    </svg>
  </span>;
}
