const rescue = require('express-rescue');
const statusCode = require('../statusCode');
const developerService = require('../services/developerServices');

const getAllDevelopers = rescue(async (req, res, next) => {
  try {
    const developers = await developerService.getAllDevelopers();
    if (developers.err) return next(developers);
    res.status(statusCode.okStatus).json(developers);
  } catch (err) {
    next({
      err: {
        status: statusCode.internalServerErrorStatus,
        message: 'internal server error',
      },
    });
  }
});

const insertNewDeveloper = rescue(async (req, res, next) => {
  const developerInfo = req.body;
  const result = await developerService.insertNewDeveloper(developerInfo);
  if (result.err) return next(result);
  return res.status(statusCode.createdStatus).json(result);
});

const deleteDeveloperById = rescue(async (req, res, next) => {
  const developerId = req.params.id;
  const result = await developerService.deleteDeveloperById(developerId);
  if (result.err) return next(result);
  return res.status(statusCode.okStatus).json({ message: 'developer deleted' });
});

const updateDeveloperById = rescue(async (req, res, next) => {
  const developerId = req.params.id;
  const developerInfo = req.body;
  const result = await developerService.updateDeveloperById(
    developerId,
    developerInfo,
  );
  if (result.err) return next(result);
  return res.status(statusCode.okStatus).json(result);
});

const getDeveloperByFullName = rescue(async (req, res, next) => {
  const developerFullName = req.params.fullname;
  const result = await developerService.getDeveloperByFullName(developerFullName);
  if (result.err) return next(result);
  return res.status(statusCode.okStatus).json(result);
});

const getDeveloperByCellphone = rescue(async (req, res, next) => {
  const developerCellphone = req.params.cellphone;
  const result = await developerService.getDeveloperByCellphone(developerCellphone);
  if (result.err) return next(result);
  return res.status(statusCode.okStatus).json(result);
});

const getDeveloperByCep = rescue(async (req, res, next) => {
  const developerCep = req.params.cep;
  const result = await developerService.getDeveloperByCep(developerCep);
  if (result.err) return next(result);
  return res.status(statusCode.okStatus).json(result);
});

const getDeveloperBySpeciality = rescue(async (req, res, next) => {
  const developerSpeciality = req.params.speciality;
  const result = await developerService.getDeveloperBySpeciality(developerSpeciality);
  if (result.err) return next(result);
  return res.status(statusCode.okStatus).json(result);
});

module.exports = {
  getAllDevelopers,
  insertNewDeveloper,
  deleteDeveloperById,
  updateDeveloperById,
  getDeveloperByFullName,
  getDeveloperByCellphone,
  getDeveloperByCep,
  getDeveloperBySpeciality,
};
