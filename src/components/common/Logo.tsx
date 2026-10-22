import React from 'react';
import { Link } from '../../lib/router';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md', showTagline = true }) => {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { box: 'w-8 h-8 text-sm', title: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10 text-base', title: 'text-lg', sub: 'text-[10px]' },
    lg: { box: 'w-12 h-12 text-lg', title: 'text-xl', sub: 'text-[11px]' }
  }[size];

  return (
    <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#11851E] rounded-md py-1">
      {/* Monogram emblem */}
      <div
        className={`${sizeClasses.box} rounded-lg flex items-center justify-center font-bold tracking-tight shadow-sm transition-transform duration-200 group-hover:scale-105 ${
          isLight
            ? 'bg-gradient-to-br from-[#11851E] to-[#045B0D] text-white border border-white/20'
            : 'bg-[#0B1E36] text-white border-2 border-[#11851E]'
        }`}
      >
        <span className="font-heading font-extrabold tracking-tighter">
          F<span className="text-[#11851E]">&</span>J
        </span>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col">
        <span
          className={`font-heading font-bold tracking-tight leading-tight ${sizeClasses.title} ${
            isLight ? 'text-white' : 'text-[#0B1E36]'
          }`}
        >
          F&J WORKFORCE
        </span>
        {showTagline && (
          <span
            className={`font-medium tracking-wider uppercase ${sizeClasses.sub} ${
              isLight ? 'text-emerald-300' : 'text-[#045B0D]'
            }`}
          >
            Limited • Lagos, Nigeria
          </span>
        )}
      </div>
    </Link>
  );
};
