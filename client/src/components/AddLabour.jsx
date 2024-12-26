import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

const AddLabour = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [jobRole, setJobRole] = useState('');
    const navigate = useNavigate();  // useNavigate for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/labours', { name, age, jobRole })
            .then(() => navigate('/labour-list'))
            .catch((error) => {
                console.error('Error adding labour:', error);
                if (error.response) {
                    // Server returned an error
                    console.error('Server Error:', error.response.data);
                } else if (error.request) {
                    // No response was received
                    console.error('No response received:', error.request);
                } else {
                    // Other errors
                    console.error('Error message:', error.message);
                }
            });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Add New Labour</h1>
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
                    Add Labour
                </button>
            </form>
        </div>
    );
};

export default AddLabour;
