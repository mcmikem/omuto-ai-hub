const express = require('express');
const router = express.Router();
const fundersController = require('../controllers/fundersController');

// GET all funders
router.get('/', fundersController.getAllFunders);

// GET a single funder by ID
router.get('/:id', fundersController.getFunderById);

// POST create a new funder
router.post('/', fundersController.createFunder);

// PUT update a funder
router.put('/:id', fundersController.updateFunder);

// DELETE a funder
router.delete('/:id', fundersController.deleteFunder);

// POST search funders with filters
router.post('/search', fundersController.searchFunders);

// GET export funders as CSV
router.get('/export/csv', fundersController.exportFundersCSV);

// GET export funders as PDF
router.get('/export/pdf', fundersController.exportFundersPDF);

// POST generate funder brief
router.post('/brief/:id', fundersController.generateFunderBrief);

module.exports = router;
