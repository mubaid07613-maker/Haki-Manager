// API client for Haki Taskmaster (FastAPI backend)

const BASE_URL = '/api';

/**
 * Handle API responses with robust error handling
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (response.status === 204) {
      return null;
    }
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const errorMsg = data?.detail || `HTTP ${response.status}: Failed request`;
      throw new Error(errorMsg);
    }
    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Fetch tasks with optional filters
  async getTasks({ status, dateFilter, search } = {}) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (dateFilter && dateFilter !== 'all') params.append('date_filter', dateFilter);
    if (search && search.trim()) params.append('search', search.trim());

    const qs = params.toString() ? `?${params.toString()}` : '';
    return request(`/tasks${qs}`);
  },

  // Get task statistics
  async getStats() {
    return request('/tasks/stats');
  },

  // Create a new task
  async createTask(taskData) {
    return request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  // Update a task
  async updateTask(id, taskData) {
    return request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  // Toggle status between 'pending' and 'in_process'
  async toggleTaskStatus(id) {
    return request(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    });
  },

  // Update status directly
  async updateStatus(id, newStatus) {
    return request(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
  },

  // Delete a task
  async deleteTask(id) {
    return request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // Health check
  async checkHealth() {
    return request('/health');
  }
};
