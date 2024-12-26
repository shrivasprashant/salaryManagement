const Salary = require('../models/Salary');

// Utility to calculate salary details
const calculateSalary = (checkInTime, checkOutTime) => {
    const officeStartTime = new Date(`1970-01-01T10:00:00Z`);
    const checkIn = new Date(`1970-01-01T${checkInTime}:00Z`);
    const checkOut = new Date(`1970-01-01T${checkOutTime}:00Z`);

    // Adjust start time to 10:00 AM if checked in earlier
    const start = checkIn < officeStartTime ? officeStartTime : checkIn;

    let totalMinutes = (checkOut - start) / 60000;
    const roundOffMinutes = (minutes) => {
        if (minutes <= 10) return 0;
        if (minutes <= 25) return 15;
        if (minutes <= 40) return 30;
        return 45;
    };

    const roundedMinutes = roundOffMinutes(totalMinutes % 60);
    let totalHours = Math.floor(totalMinutes / 60) + roundedMinutes / 60;

    let lunchDeducted = false;
    if (start.getUTCHours() < 14 && checkOut.getUTCHours() > 14) {
        totalHours -= 0.5; // Deduct 30 minutes for lunch
        lunchDeducted = true;
    }

    const overtime = totalHours > 8 ? totalHours - 8 : 0;

    return {
        totalHours,
        overtime,
        lunchDeducted,
    };
};

// Create salary record
const createSalary = async (req, res) => {
    try {
        let { labourId, date, checkInTime, checkOutTime } = req.body;

        // Ensure required fields are provided
        if (!labourId || !date || !checkInTime || !checkOutTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let { totalHours, overtime, lunchDeducted } = calculateSalary(checkInTime, checkOutTime);

        let salary = totalHours * 100 + overtime * 150;

        let newSalary = await Salary.create({
            labourId,
            date,
            checkInTime,
            checkOutTime,
            totalHours,
            overtimeHours: overtime,
            lunchDeducted,
            salary,
        });

        res.status(201).json(newSalary);
    } catch (error) {
        console.error('Error creating salary:', error);
        res.status(500).json({ message: 'Error creating salary record', error: error.message });
    }
};

// Approve or disapprove salary
const updateSalaryStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        // Validate status input
        if (!['approved', 'disapproved'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedSalary = await Salary.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedSalary) {
            return res.status(404).json({ message: 'Salary record not found' });
        }

        res.status(200).json(updatedSalary);
    } catch (error) {
        console.error('Error updating salary status:', error);
        res.status(500).json({ message: 'Error updating salary status', error: error.message });
    }
};

// Get salary records
const getSalaries = async (req, res) => {
    try {
        const { labourId } = req.query;

        const query = labourId ? { labourId } : {};
        const salaries = await Salary.find(query).populate('labourId', 'name'); // Adjust 'name' field based on Labour model

        res.status(200).json(salaries);
    } catch (error) {
        console.error('Error retrieving salary records:', error);
        res.status(500).json({ message: 'Error retrieving salary records', error: error.message });
    }
};

module.exports = { createSalary, updateSalaryStatus, getSalaries };
