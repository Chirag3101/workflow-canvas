import axios from './api';

export const workflowApi = {
  createWorkflow: async (workflowData) => {
    const response = await axios.post('/workflows', workflowData);
    return response.data;
  },

  getWorkflows: async () => {
    const response = await axios.get('/workflows');
    return response.data;
  },

  getWorkflow: async (id) => {
    const response = await axios.get(`/workflows/${id}`);
    return response.data;
  },

  updateWorkflow: async (id, workflowData) => {
    const response = await axios.put(`/workflows/${id}`, workflowData);
    return response.data;
  },

  deleteWorkflow: async (id) => {
    const response = await axios.delete(`/workflows/${id}`);
    return response.data;
  },
};
