const rescue = require('express-rescue');
const statusCode = require('../statusCode');
const developerService = require('../services/developerServices');

const getAllDevelopers = rescue(async (req, res) => {
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

module.exports = {
  getAllDevelopers,
  insertNewDeveloper,
};
