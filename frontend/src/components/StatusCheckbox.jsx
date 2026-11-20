import React from 'react';
import { Zap, Clock } from 'lucide-react';

/**
 * Dual-State Haki Status Checkbox:
 * - 'pending': Latent state (dark obsidian, muted slate, dormant)
 * - 'in_process': Active Conqueror's Haki state (crimson lightning, flaming glow)
 */
export default function StatusCheckbox({ status, onToggle, disabled = false, showLabel = true }) {
  const isInProcess = status === 'in_process';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onToggle();
      }}
      disabled={disabled}
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 transition-all duration-200 select-none cursor-pointer focus:outline-none clip-sharp-sm
        ${isInProcess 
          ? 'bg-red-950/70 border border-red-500 text-red-200 shadow-haki-sm hover:shadow-haki-md hover:border-red-400' 
          : 'bg-void-850 border border-slate-700/80 text-slate-400 hover:border-red-800/80 hover:text-slate-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      title={`Click to switch to ${isInProcess ? 'Pending' : 'In Process'}`}
    >
      {/* Box indicator */}
      <div 
        className={`w-5 h-5 flex items-center justify-center border transition-all duration-200 clip-sharp-sm
          ${isInProcess 
            ? 'bg-red-600 border-red-400 text-white shadow-haki-sm' 
            : 'bg-void-950 border-slate-600 group-hover:border-red-600'
          }
        `}
      >
        {isInProcess ? (
          <Zap className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
        ) : (
          <Clock className="w-3 h-3 text-slate-500 group-hover:text-red-400 transition-colors" />
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span className={`text-xs font-mono tracking-wider uppercase font-semibold transition-colors
          ${isInProcess ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-slate-400 group-hover:text-slate-200'}
        `}>
          {isInProcess ? 'In Process' : 'Pending'}
        </span>
      )}

      {/* Subtle edge lightning effect on active */}
      {isInProcess && (
        <div className="absolute inset-0 border border-red-500/30 clip-sharp-sm pointer-events-none animate-pulse" />
      )}
    </button>
  );
}
