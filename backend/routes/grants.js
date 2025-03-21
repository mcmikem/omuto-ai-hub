const express = require('express');
const router = express.Router();
const grantsController = require('../controllers/grantsController');

// GET all grants
router.get('/', grantsController.getAllGrants);

// GET a single grant by ID
router.get('/:id', grantsController.getGrantById);

// POST create a new grant
router.post('/', grantsController.createGrant);

// PUT update a grant
router.put('/:id', grantsController.updateGrant);

// DELETE a grant
router.delete('/:id', grantsController.deleteGrant);

// POST generate a grant proposal
router.post('/generate', grantsController.generateProposal);

// POST clone a grant proposal
router.post('/clone/:id', grantsController.cloneProposal);

// GET export a grant as PDF
router.get('/export/:id', grantsController.exportProposal);

module.exports = router;
