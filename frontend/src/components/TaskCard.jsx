import React from 'react';
import { Calendar, AlertCircle, Edit3, Trash2, Zap, Clock } from 'lucide-react';
import StatusCheckbox from './StatusCheckbox';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const isInProcess = task.status === 'in_process';

  // Compute date relative status
  const getDateInfo = (dueDateStr) => {
    if (!dueDateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDateStr + 'T00:00:00');
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: `OVERDUE (${Math.abs(diffDays)}d ago)`,
        type: 'overdue',
        color: 'bg-red-950 text-red-300 border-red-600 animate-pulse',
      };
    } else if (diffDays === 0) {
      return {
        label: 'DUE TODAY',
        type: 'today',
        color: 'bg-red-900/60 text-red-200 border-red-500 shadow-haki-sm',
      };
    } else if (diffDays === 1) {
      return {
        label: 'DUE TOMORROW',
        type: 'tomorrow',
        color: 'bg-void-850 text-slate-300 border-red-900/60',
      };
    } else {
      return {
        label: `DUE IN ${diffDays} DAYS (${dueDateStr})`,
        type: 'future',
        color: 'bg-void-850 text-slate-400 border-slate-800',
      };
    }
  };

  const dateInfo = getDateInfo(task.due_date);

  return (
    <div
      className={`group relative p-4 transition-all duration-300 clip-sharp
        ${isInProcess
          ? 'bg-void-900 border border-red-500/80 shadow-haki-sm hover:shadow-haki-md'
          : 'bg-void-900/70 border border-slate-800/80 hover:border-red-900/80'
        }
      `}
    >
      {/* Red vertical Haki blade line on the left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
          ${isInProcess ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : 'bg-slate-700 group-hover:bg-red-800'}
        `}
      />

      <div className="flex flex-col sm:flex-row items-start justify-between gap-3.5 pl-2">
        
        {/* Left: Checkbox + Content */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          
          {/* Status Checkbox */}
          <div className="pt-0.5 shrink-0">
            <StatusCheckbox
              status={task.status}
              onToggle={() => onToggleStatus(task.id)}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className={`text-sm font-semibold tracking-wide break-words
                ${isInProcess ? 'text-slate-100' : 'text-slate-300'}
              `}>
                {task.title}
              </h3>
            </div>

            {task.description && (
              <p className="text-xs text-slate-400 line-clamp-3 font-normal leading-relaxed">
                {task.description}
              </p>
            )}

            {/* Date Tag */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {dateInfo ? (
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-2 py-0.5 border clip-sharp-sm uppercase font-semibold ${dateInfo.color}`}>
                  <Calendar className="w-3 h-3" />
                  {dateInfo.label}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-600 uppercase">
                  No deadline assigned
                </span>
              )}

              <span className="text-[10px] font-mono text-slate-600">
                • ID: #{task.id}
              </span>
            </div>
          </div>

        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1 self-end sm:self-start shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(task)}
            title="Edit Objective"
            className="p-1.5 bg-void-850 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-700/60 clip-sharp-sm transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            title="Obliterate Task"
            className="p-1.5 bg-void-850 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-600 clip-sharp-sm transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
