import React, { useEffect, useState } from 'react';
import { getSalaries, updateSalaryStatus } from '../api/salaryAPI';

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const fetchSalaries = async () => {
      const response = await getSalaries();
      setSalaries(response.data);
    };

    fetchSalaries();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateSalaryStatus(id, status);
    alert(`Status updated to ${status}`);
    setSalaries((prev) =>
      prev.map((salary) =>
        salary._id === id ? { ...salary, status } : salary
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Salary Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salaries.map((salary) => (
          <div
            key={salary._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{`Labour ID: ${salary.labourId}`}</h2>
            <p className="text-sm text-gray-500">{`Date: ${new Date(
              salary.date
            ).toLocaleDateString()}`}</p>
            <div className="text-sm text-gray-500 mt-2">
              <p>{`Check-In: ${salary.checkInTime}`}</p>
              <p>{`Check-Out: ${salary.checkOutTime || 'N/A'}`}</p>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <p>{`Total Hours: ${salary.totalHours || 0}`}</p>
              <p>{`Overtime: ${salary.overtimeHours || 0}`}</p>
              <p>{`Lunch Deducted: ${
                salary.lunchDeducted ? 'Yes' : 'No'
              }`}</p>
            </div>
            <p className="text-lg font-medium text-gray-800 mt-4">{`Salary: ₹${salary.salary}`}</p>
            <p
              className={`mt-2 px-2 py-1 inline-block text-sm font-medium rounded-full ${
                salary.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : salary.status === 'disapproved'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {`Status: ${salary.status}`}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleStatusChange(salary._id, 'approved')}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(salary._id, 'disapproved')}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow"
              >
                Disapprove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryList;
