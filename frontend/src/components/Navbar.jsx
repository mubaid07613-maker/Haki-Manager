import React from 'react';
import { Flame, ShieldAlert, Swords, Zap, CheckCircle2 } from 'lucide-react';

export default function Navbar({ stats, onRefresh }) {
  return (
    <header className="border-b border-red-950/60 bg-void-900/90 backdrop-blur-md sticky top-0 z-30 shadow-haki-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 bg-void-850 border border-red-600/50 clip-sharp shadow-haki-sm group hover:border-red-500 transition-all">
            <Swords className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-200" />
            <div className="absolute inset-0 bg-red-600/10 blur-xs -z-10 animate-haki-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-widest text-slate-100 font-haki flex items-center gap-2">
                HAKI <span className="text-red-500">//</span> TASKMASTER
              </h1>
              <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 bg-red-950/80 text-red-400 border border-red-800/40 clip-sharp-sm font-semibold uppercase">
                Red-Hair Shanks
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide">
              Haoshoku Focus & Execution System
            </p>
          </div>
        </div>

        {/* Live Counters / Stats Bar */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* Total */}
          <div className="px-3 py-1.5 bg-void-850/80 border border-slate-800 clip-sharp-sm flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Total:</span>
            <span className="font-mono text-sm font-bold text-slate-100">{stats.total}</span>
          </div>

          {/* In Process (Conqueror's Surge) */}
          <div className="px-3 py-1.5 bg-red-950/40 border border-red-600/50 clip-sharp-sm flex items-center gap-2 shadow-haki-sm">
            <Zap className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-red-300 font-medium">In Process:</span>
            <span className="font-mono text-sm font-bold text-red-400">{stats.in_process}</span>
          </div>

          {/* Pending */}
          <div className="px-3 py-1.5 bg-void-850/80 border border-slate-700/60 clip-sharp-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Pending:</span>
            <span className="font-mono text-sm font-bold text-slate-300">{stats.pending}</span>
          </div>

          {/* Overdue */}
          {stats.overdue > 0 && (
            <div className="px-3 py-1.5 bg-red-900/60 border border-red-500 clip-sharp-sm flex items-center gap-2 animate-bounce">
              <ShieldAlert className="w-3.5 h-3.5 text-red-200" />
              <span className="text-[11px] uppercase tracking-wider text-red-200 font-bold">Overdue:</span>
              <span className="font-mono text-sm font-black text-white">{stats.overdue}</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
