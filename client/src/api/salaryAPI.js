import axios from 'axios';

const API_URL = 'http://localhost:5000/api/salary';

export const createSalary = async (data) => {
  return axios.post(`${API_URL}/create`, data);
};

export const updateSalaryStatus = async (id, status) => {
  return axios.patch(`${API_URL}/update-status`, { id, status });
};

export const getSalaries = async () => {
  return axios.get(`${API_URL}`);
};
