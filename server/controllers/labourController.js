const Labour = require('../models/labour');

// Get all labours
exports.getAllLabours = async (req, res) => {
    try {
        const labours = await Labour.find();
        res.status(200).json(labours);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch labours', error });
    }
};

// Get single labour by ID
exports.getLabourById = async (req, res) => {
    try {
        const labour = await Labour.findById(req.params.id);
        if (!labour) return res.status(404).json({ message: 'Labour not found' });
        res.status(200).json(labour);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch labour', error });
    }
};

// Create a new labour
exports.createLabour = async (req, res) => {
    try {
        const { name, age, jobRole } = req.body;
        const newLabour = new Labour({ name, age, jobRole });
        await newLabour.save();
        res.status(201).json(newLabour);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create labour', error });
    }
};

// Update a labour
exports.updateLabour = async (req, res) => {
    try {
        const updatedLabour = await Labour.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedLabour) return res.status(404).json({ message: 'Labour not found' });
        res.status(200).json(updatedLabour);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update labour', error });
    }
};

// Delete a labour
exports.deleteLabour = async (req, res) => {
    try {
        const deletedLabour = await Labour.findByIdAndDelete(req.params.id);
        if (!deletedLabour) return res.status(404).json({ message: 'Labour not found' });
        res.status(200).json({ message: 'Labour deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete labour', error });
    }
};
