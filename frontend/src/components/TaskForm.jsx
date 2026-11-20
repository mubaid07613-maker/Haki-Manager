import React, { useState } from 'react';
import { Plus, Calendar, AlignLeft, Shield, Sparkles } from 'lucide-react';
import StatusCheckbox from './StatusCheckbox';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending'); // default pending
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Set quick today date
  const setToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setDueDate(today);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Objective title is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onTaskCreated({
        title: title.trim(),
        description: description.trim() || null,
        due_date: dueDate || null,
        status: status,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
      setIsExpanded(false);
    } catch (err) {
      setError(err.message || 'Failed to strike objective.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-void-900 border border-red-950/80 p-4 md:p-5 clip-sharp shadow-haki-md transition-all">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Main Title Input Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Strike a new objective... (e.g., Master Advanced Conqueror's Haki)"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!isExpanded && e.target.value) setIsExpanded(true);
              }}
              onFocus={() => setIsExpanded(true)}
              className="w-full bg-void-950 border border-slate-800 text-slate-100 placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 focus:shadow-haki-sm clip-sharp-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-haki font-bold text-xs uppercase tracking-widest clip-sharp-sm shadow-haki-sm hover:shadow-haki-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{isSubmitting ? 'Channeling...' : 'Add Objective'}</span>
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            {error}
          </p>
        )}

        {/* Collapsible Options (Description, Due Date, Initial Status) */}
        {isExpanded && (
          <div className="pt-3 border-t border-red-950/60 space-y-3 animate-fadeIn">
            {/* Description Area */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-red-500" />
                Strategic Intel / Notes:
              </label>
              <textarea
                rows={2}
                placeholder="Add tactical details, context or milestones..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-void-950 border border-slate-800/80 text-slate-200 placeholder-slate-600 px-3 py-2 text-xs focus:outline-none focus:border-red-600 clip-sharp-sm resize-none"
              />
            </div>

            {/* Date and Initial Status Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Due Date */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span className="text-xs text-slate-400 font-mono">DEADLINE:</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-void-950 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 focus:outline-none focus:border-red-600 clip-sharp-sm"
                />
                <button
                  type="button"
                  onClick={setToday}
                  className="text-[11px] text-red-400 hover:text-red-300 underline font-mono cursor-pointer"
                >
                  Set Today
                </button>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">INITIAL STATE:</span>
                <StatusCheckbox
                  status={status}
                  onToggle={() => setStatus(status === 'pending' ? 'in_process' : 'pending')}
                />
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
