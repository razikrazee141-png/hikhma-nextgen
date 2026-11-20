import React from 'react';

/**
 * Hikhma Islamic School Official Brand Logo Component
 * - Displays the authentic, official brand identity mark.
 * - Uses the transparent official wordmark:
 *     - `/logo.png` for light backdrops (dark charcoal/black text)
 *     - `/logo-white.png` for dark backdrops (pure white text)
 */
export default function Logo({ 
  variant = 'dark', // 'dark' | 'light'
  size = 'default', // 'sm' | 'default' | 'lg' | 'xl'
  showSubtitle = true, 
  className = '' 
}) {
  const isLightOnDark = variant === 'light';

  const sizeMap = {
    sm: {
      img: 'h-8 sm:h-9',
      subtitle: 'text-[9px]',
      title: 'text-xs',
    },
    default: {
      img: 'h-11 sm:h-13 md:h-14',
      subtitle: 'text-[9px] sm:text-[10px]',
      title: 'text-xs sm:text-sm',
    },
    lg: {
      img: 'h-14 sm:h-16 md:h-20',
      subtitle: 'text-[10px] sm:text-xs',
      title: 'text-sm sm:text-base',
    },
    xl: {
      img: 'h-16 sm:h-20 md:h-24',
      subtitle: 'text-xs',
      title: 'text-base sm:text-lg',
    }
  };

  const current = sizeMap[size] || sizeMap.default;
  const logoSrc = isLightOnDark ? '/logo-white.png' : '/logo.png';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Wordmark Image */}
      <img
        src={logoSrc}
        alt="Hikhma Islamic School"
        className={`${current.img} w-auto object-contain transition-transform duration-200`}
        onError={(e) => {
          e.currentTarget.src = '/official-logo-original.png';
        }}
      />

      {/* Official Management Badge / Governance Tag */}
      {showSubtitle && (
        <div className={`hidden sm:flex flex-col border-l-2 pl-3.5 ${isLightOnDark ? 'border-emerald-800' : 'border-slate-300'}`}>
          <span className={`text-[9px] uppercase tracking-widest font-extrabold ${isLightOnDark ? 'text-gold-400' : 'text-gold-700'}`}>
            Managed by
          </span>
          <span className={`text-xs font-bold tracking-tight ${isLightOnDark ? 'text-white' : 'text-emerald-950'}`}>
            NextGen Organisation
          </span>
          <span className={`text-[9px] font-medium tracking-wide ${isLightOnDark ? 'text-emerald-300' : 'text-slate-500'}`}>
            Shafi'i &amp; Hanafi Jurisprudence
          </span>
        </div>
      )}
    </div>
  );
}
