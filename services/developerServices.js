const { Developer } = require('../models');
const statusCode = require('../statusCode');
const yup = require('yup');

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

const getAllDevelopers = async () => {
  try {
    const developers = await Developer.findAll();
    if (!developers)
      return {
        err: {
          message: 'No developers found',
          status: statusCode.notFoundStatus,
        },
      };
    return developers;
  } catch (error) {
    console.log(error);
    return {
      err: {
        status: statusCode.internalServerErrorStatus,
        message: 'error check the console for more info',
      },
    };
  }
};

module.exports = {
  getAllDevelopers,
};
