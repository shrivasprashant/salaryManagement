import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LabourList = () => {
  const [labours, setLabours] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/labours')
      .then((response) => setLabours(response.data))
      .catch((error) => console.error('Error fetching labours:', error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/labours/${id}`)
      .then(() => setLabours(labours.filter(labour => labour._id !== id)))
      .catch((error) => console.error('Error deleting labour:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Labour List</h1>
      <Link to="/add-labour" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
        Add New Labour
      </Link>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Job Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {labours.map((labour) => (
            <tr key={labour._id}>
              <td className="px-4 py-2 border">{labour.name}</td>
              <td className="px-4 py-2 border">{labour.age}</td>
              <td className="px-4 py-2 border">{labour.jobRole}</td>
              <td className="px-4 py-2 border">
                <Link
                  to={`/edit-labour/${labour._id}`}
                  className="text-yellow-500 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(labour._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabourList;
