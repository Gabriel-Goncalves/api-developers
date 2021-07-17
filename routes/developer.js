const express = require('express');
const statusCode = require('../statusCode');
const developerController = require('../controllers/developerController');
const router = express.Router();

router.get('/', developerController.getAllDevelopers);

router.post('/', (req, res) => {
  res.status(statusCode.okStatus).json({message: 'Post Router'});
});

router.put('/', (req, res) => {
  res.status(statusCode.okStatus).json({message: 'Put Router'});
});

router.delete('/', (req, res) => {
  res.status(statusCode.okStatus).json({message: 'Delete Router'});
});

module.exports = router;