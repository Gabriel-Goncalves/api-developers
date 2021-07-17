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

module.exports = {
  getAllDevelopers,
};
