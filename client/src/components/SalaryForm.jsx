import React, { useState } from 'react';
import axios from 'axios';
import { createSalary } from '../api/salaryAPI';

const SalaryForm = () => {
  const [formData, setFormData] = useState({
    labourId: '',
    date: '',
    checkInTime: '',
    checkOutTime: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response =  await createSalary(formData);
      console.log(response);
      
      setSuccess('Salary created successfully!');
      setFormData({
        labourId: '',
        date: '',
        checkInTime: '',
        checkOutTime: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create salary');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Create Salary</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="labourId"
          placeholder="Labour ID"
          value={formData.labourId}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="time"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="time"
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Salary
        </button>
      </form>
    </div>
  );
};

export default SalaryForm;
