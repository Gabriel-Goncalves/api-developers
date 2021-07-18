const express = require('express');
const statusCode = require('../statusCode');
const developerController = require('../controllers/developerController');
const router = express.Router();

router.get('/', developerController.getAllDevelopers);

router.get('/fullname/:fullname', developerController.getDeveloperByFullName);

router.get('/cellphone/:cellphone', developerController.getDeveloperByCellphone);

router.get('/cep/:cep', developerController.getDeveloperByCep);

router.get('/speciality/:speciality', developerController.getDeveloperBySpeciality);

router.post('/', developerController.insertNewDeveloper);

router.put('/:id', developerController.updateDeveloperById);

router.delete('/:id', developerController.deleteDeveloperById);


module.exports = router;