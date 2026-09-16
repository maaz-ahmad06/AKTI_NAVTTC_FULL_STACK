const FormData = require('../models/FormData');

// @desc   Create - Save form data
// @route  POST /api/form
const submitForm = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    if (!name || !email || !age || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newEntry = new FormData({ name, email, age, course });
    await newEntry.save();

    res.status(201).json({ message: 'Form data saved successfully', data: newEntry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Read - Get all entries
// @route  GET /api/form
const getAllForms = async (req, res) => {
  try {
    const forms = await FormData.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Read - Get single entry by ID
// @route  GET /api/form/:id
const getFormById = async (req, res) => {
  try {
    const form = await FormData.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Entry not found' });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Update - Update entry by ID
// @route  PUT /api/form/:id
const updateForm = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    const updatedForm = await FormData.findByIdAndUpdate(
      req.params.id,
      { name, email, age, course },
      { new: true, runValidators: true }
    );

    if (!updatedForm) return res.status(404).json({ message: 'Entry not found' });

    res.status(200).json({ message: 'Updated successfully', data: updatedForm });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Delete - Delete entry by ID
// @route  DELETE /api/form/:id
const deleteForm = async (req, res) => {
  try {
    const deletedForm = await FormData.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: 'Entry not found' });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { submitForm, getAllForms, getFormById, updateForm, deleteForm };