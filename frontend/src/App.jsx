import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import DateFilters from './components/DateFilters';
import TaskCard from './components/TaskCard';
import EditTaskModal from './components/EditTaskModal';
import { api } from './services/api';
import { Swords, RefreshCw, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_process: 0,
    overdue: 0,
    today: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'upcoming', 'overdue'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'in_process', 'pending'
  const [search, setSearch] = useState('');

  // Editing state
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Notification toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch tasks and stats
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [fetchedTasks, fetchedStats] = await Promise.all([
        api.getTasks({ status: statusFilter, dateFilter, search }),
        api.getStats(),
      ]);
      setTasks(fetchedTasks || []);
      setStats(fetchedStats || { total: 0, pending: 0, in_process: 0, overdue: 0, today: 0 });
    } catch (err) {
      console.error(err);
      setError('Unable to link with the Haki Taskmaster Backend. Is FastAPI running on port 8000?');
    } finally {
      setLoading(false);
    }
  }, [dateFilter, statusFilter, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle create
  const handleTaskCreated = async (taskData) => {
    const created = await api.createTask(taskData);
    showToast(`Objective "${created.title}" engraved into history.`, 'success');
    await loadData();
  };

  // Handle status toggle (Pending <-> In Process)
  const handleToggleStatus = async (taskId) => {
    try {
      const updated = await api.toggleTaskStatus(taskId);
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: updated.status } : t))
      );
      // Refresh stats
      const updatedStats = await api.getStats();
      setStats(updatedStats);
      showToast(
        `Target #${taskId} marked ${updated.status === 'in_process' ? 'IN PROCESS ⚡' : 'PENDING ⏳'}`,
        'success'
      );
    } catch (err) {
      showToast('Failed to shift task status.', 'error');
    }
  };

  // Handle edit
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (taskId, updatedData) => {
    await api.updateTask(taskId, updatedData);
    showToast(`Objective #${taskId} updated.`, 'success');
    await loadData();
  };

  // Handle delete
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Strike this objective from the mission log?')) {
      try {
        await api.deleteTask(taskId);
        showToast(`Objective #${taskId} annihilated.`, 'info');
        await loadData();
      } catch (err) {
        showToast('Failed to delete objective.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-void-950 text-slate-100 haki-aura-bg relative selection:bg-red-600 selection:text-white flex flex-col">
      
      {/* Background Red Lightning Ambient Vignette */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-red-950/20 blur-[140px] rounded-full" />
      </div>

      {/* Navigation & Header */}
      <Navbar stats={stats} onRefresh={loadData} />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        
        {/* Hero Section Banner */}
        <div className="relative border border-red-900/40 bg-void-900/60 p-5 clip-sharp shadow-haki-sm overflow-hidden">
          {/* Subtle sword slash watermark */}
          <div className="absolute -right-6 -bottom-6 text-red-950/20 pointer-events-none">
            <Swords className="w-40 h-40" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-semibold">
                  HAOSHOKU HAKI AURA ACTIVE
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold font-haki tracking-wide text-white">
                "THERE IS NO NEED TO PANIC. THE ERA IS MOVING FORWARD."
              </h2>
              <p className="text-xs text-slate-400 mt-1 italic">
                Manage high-stakes targets with absolute resolve. Shift states between Latent and In Process.
              </p>
            </div>

            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 bg-void-850 hover:bg-slate-800 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-600 clip-sharp-sm text-xs font-mono transition-all cursor-pointer shrink-0"
              title="Sync with Backend"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* Task Input Form */}
        <section>
          <TaskForm onTaskCreated={handleTaskCreated} />
        </section>

        {/* Filter Controls (Status & Date System) */}
        <section>
          <DateFilters
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            search={search}
            setSearch={setSearch}
            stats={stats}
          />
        </section>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-950/80 border border-red-500 text-red-200 clip-sharp flex items-center justify-between gap-3 shadow-haki-sm">
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={loadData}
              className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white text-xs font-mono clip-sharp-sm uppercase cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Task List */}
        <section className="space-y-3">
          {loading && tasks.length === 0 ? (
            <div className="text-center py-12 border border-slate-800/60 bg-void-900/30 clip-sharp">
              <div className="inline-block p-3 rounded-full bg-red-950/40 border border-red-800/40 mb-3 animate-pulse">
                <Swords className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm font-mono text-slate-400">Summoning targets from the Grand Line...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 border border-slate-800/60 bg-void-900/40 clip-sharp">
              <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <h3 className="text-sm font-haki font-bold text-slate-300 uppercase tracking-wider">
                No Objectives Detected
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {search || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'No tasks match your active filters. Try clearing search or switching categories.'
                  : 'The horizon is clear. Enter a new objective above to ignite your campaign.'}
              </p>
              {(search || statusFilter !== 'all' || dateFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('all');
                    setDateFilter('all');
                  }}
                  className="mt-4 px-3 py-1.5 bg-void-850 hover:bg-slate-800 text-red-400 border border-red-900/60 text-xs font-mono clip-sharp-sm transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
                <span>Showing {tasks.length} {tasks.length === 1 ? 'objective' : 'objectives'}</span>
                <span>Click checkbox to shift Pending ↔ In Process</span>
              </div>

              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Edit Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-void-900 border border-red-600 text-slate-100 text-xs font-mono clip-sharp shadow-haki-lg animate-bounce">
          <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-red-950/40 bg-void-950/90 py-4 text-center text-slate-600 text-xs font-mono">
        <p>Haki Taskmaster // Red Hair Shanks Edition • Fast API + React.js</p>
      </footer>

    </div>
  );
}
