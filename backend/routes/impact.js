const express = require('express');
const router = express.Router();
const impactController = require('../controllers/impactController');

// GET all impact data
router.get('/', impactController.getAllImpactData);

// GET impact data by program
router.get('/program/:program', impactController.getImpactByProgram);

// GET impact data by location
router.get('/location/:location', impactController.getImpactByLocation);

// GET impact data by time period
router.get('/period/:period', impactController.getImpactByPeriod);

// POST upload new impact data
router.post('/upload', impactController.uploadImpactData);

// GET generate impact dashboard
router.get('/dashboard', impactController.generateDashboard);

// GET export impact data as CSV
router.get('/export/csv', impactController.exportDataCSV);

// GET export impact data as PDF report
router.get('/export/pdf', impactController.exportDataPDF);

// GET statistics summary
router.get('/stats', impactController.getStatistics);

// GET chart data
router.get('/charts/:chartType', impactController.getChartData);

module.exports = router;
