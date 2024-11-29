import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const workflowsApi = {
  // Get all workflows
  getAllWorkflows: async () => {
    try {
      const response = await api.get('/workflows');
      return response.data;
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw error;
    }
  },

  // Get single workflow
  getWorkflow: async (id) => {
    try {
      const response = await api.get(`/workflows/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching workflow ${id}:`, error);
      throw error;
    }
  },

  // Create new workflow
  createWorkflow: async (workflowData) => {
    try {
      const response = await api.post('/workflows', workflowData);
      return response.data;
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  },

  // Update workflow
  updateWorkflow: async (id, workflowData) => {
    try {
      const response = await api.put(`/workflows/${id}`, workflowData);
      return response.data;
    } catch (error) {
      console.error(`Error updating workflow ${id}:`, error);
      throw error;
    }
  },

  // Delete workflow
  deleteWorkflow: async (id) => {
    try {
      await api.delete(`/workflows/${id}`);
    } catch (error) {
      console.error(`Error deleting workflow ${id}:`, error);
      throw error;
    }
  },
};

export default api;
