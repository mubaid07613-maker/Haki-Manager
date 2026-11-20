import React from 'react';
import { Search, Calendar, Zap, Clock, ShieldAlert, X } from 'lucide-react';

export default function DateFilters({
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
  stats
}) {
  return (
    <div className="bg-void-900/80 border border-slate-800/80 p-3.5 clip-sharp space-y-3">
      
      {/* Search & Status Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search objectives or intel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-void-950 border border-slate-800/90 text-slate-200 text-xs pl-9 pr-8 py-2 focus:outline-none focus:border-red-600 clip-sharp-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filters (All / In Process / Pending) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-red-950 border border-red-500 text-red-100 shadow-haki-sm font-bold'
                : 'bg-void-950 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All States
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('in_process')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer ${
              statusFilter === 'in_process'
                ? 'bg-red-950 border border-red-500 text-red-300 shadow-haki-sm font-bold'
                : 'bg-void-950 border border-slate-800 text-slate-400 hover:text-red-400'
            }`}
          >
            <Zap className="w-3 h-3 text-red-400" />
            <span>In Process ({stats.in_process})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-slate-800 border border-slate-600 text-slate-100 font-bold'
                : 'bg-void-950 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Pending ({stats.pending})</span>
          </button>
        </div>

      </div>

      {/* Date System Categorization Bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1 shrink-0">
          <Calendar className="w-3 h-3 text-red-500" />
          Timeline:
        </span>

        {/* All Dates */}
        <button
          type="button"
          onClick={() => setDateFilter('all')}
          className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer shrink-0 ${
            dateFilter === 'all'
              ? 'bg-red-900/60 text-red-200 border border-red-600/70 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Dates
        </button>

        {/* Today */}
        <button
          type="button"
          onClick={() => setDateFilter('today')}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer shrink-0 ${
            dateFilter === 'today'
              ? 'bg-red-900/60 text-red-200 border border-red-600/70 font-bold shadow-haki-sm'
              : 'text-slate-400 hover:text-red-400'
          }`}
        >
          Today {stats.today > 0 && <span className="text-[10px] bg-red-950 px-1 py-0.2 border border-red-700/50">{stats.today}</span>}
        </button>

        {/* Upcoming */}
        <button
          type="button"
          onClick={() => setDateFilter('upcoming')}
          className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer shrink-0 ${
            dateFilter === 'upcoming'
              ? 'bg-red-900/60 text-red-200 border border-red-600/70 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Upcoming
        </button>

        {/* Overdue */}
        <button
          type="button"
          onClick={() => setDateFilter('overdue')}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider clip-sharp-sm transition-all cursor-pointer shrink-0 ${
            dateFilter === 'overdue'
              ? 'bg-red-800 text-white border border-red-400 font-bold shadow-haki-md'
              : stats.overdue > 0 
                ? 'text-red-400 hover:text-red-300 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {stats.overdue > 0 && <ShieldAlert className="w-3 h-3 text-red-500 animate-pulse" />}
          Overdue {stats.overdue > 0 && <span className="text-[10px] bg-red-950 px-1 py-0.2 border border-red-500 text-red-300">{stats.overdue}</span>}
        </button>
      </div>

    </div>
  );
}
