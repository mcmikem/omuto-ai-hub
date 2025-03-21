const express = require('express');
const router = express.Router();
const theoryOfChangeController = require('../controllers/theoryOfChangeController');

// GET all theory of change models
router.get('/', theoryOfChangeController.getAllModels);

// GET a single theory of change model by ID
router.get('/:id', theoryOfChangeController.getModelById);

// POST create a new theory of change model
router.post('/', theoryOfChangeController.createModel);

// PUT update a theory of change model
router.put('/:id', theoryOfChangeController.updateModel);

// DELETE a theory of change model
router.delete('/:id', theoryOfChangeController.deleteModel);

// POST generate a theory of change model
router.post('/generate', theoryOfChangeController.generateModel);

// GET export a theory of change model as image
router.get('/export/image/:id', theoryOfChangeController.exportModelAsImage);

// GET export a theory of change model as PDF
router.get('/export/pdf/:id', theoryOfChangeController.exportModelAsPDF);

// POST link theory of change to MEAL plan
router.post('/link-meal/:id', theoryOfChangeController.linkToMEAL);

module.exports = router;
