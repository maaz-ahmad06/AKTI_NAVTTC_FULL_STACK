const express = require('express');
const router = express.Router();
const {
  submitForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm
} = require('../controllers/formController');

router.post('/', submitForm);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;