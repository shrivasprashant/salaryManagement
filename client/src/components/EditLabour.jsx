// EditLabour.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditLabour = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [jobRole, setJobRole] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the labour data to pre-fill the form
    axios.get(`http://localhost:5000/api/labours/${id}`)
      .then((response) => {
        const labour = response.data;
        setName(labour.name);
        setAge(labour.age);
        setJobRole(labour.jobRole);
      })
      .catch((error) => console.error('Error fetching labour:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/labours/${id}`, { name, age, jobRole })
      .then(() => navigate('/labour-list'))
      .catch((error) => console.error('Error updating labour:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Edit Labour</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-lg">Age</label>
          <input
            type="number"
            id="age"
            className="w-full px-4 py-2 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jobRole" className="block text-lg">Job Role</label>
          <input
            type="text"
            id="jobRole"
            className="w-full px-4 py-2 border rounded"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Labour
        </button>
      </form>
    </div>
  );
};

export default EditLabour;  // Make sure to export it as default
