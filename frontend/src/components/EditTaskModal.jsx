import React, { useState, useEffect } from 'react';
import { X, Calendar, AlignLeft, Check } from 'lucide-react';
import StatusCheckbox from './StatusCheckbox';

export default function EditTaskModal({ task, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.due_date || '');
      setStatus(task.status || 'pending');
      setError('');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      await onSave(task.id, {
        title: title.trim(),
        description: description.trim() || null,
        due_date: dueDate || null,
        status: status,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-void-900 border border-red-600/70 p-6 clip-sharp shadow-haki-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-950/80 mb-4">
          <h2 className="text-sm font-bold font-haki tracking-widest text-slate-100 flex items-center gap-2">
            MODIFY OBJECTIVE <span className="text-red-500">#{task.id}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-400 p-1 clip-sharp-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 font-mono mb-3 p-2 bg-red-950/60 border border-red-800">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              Objective Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-void-950 border border-slate-800 text-slate-100 px-3 py-2 text-xs focus:outline-none focus:border-red-500 clip-sharp-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              Intel & Notes:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-void-950 border border-slate-800 text-slate-200 px-3 py-2 text-xs focus:outline-none focus:border-red-500 clip-sharp-sm resize-none"
            />
          </div>

          {/* Due Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-red-500" />
                Due Date:
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-void-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 focus:outline-none focus:border-red-500 clip-sharp-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Execution State:
              </label>
              <div className="pt-0.5">
                <StatusCheckbox
                  status={status}
                  onToggle={() => setStatus(status === 'pending' ? 'in_process' : 'pending')}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 clip-sharp-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-wider font-bold clip-sharp-sm shadow-haki-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
