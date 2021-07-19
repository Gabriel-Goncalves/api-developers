const { Developer } = require('../models');
const statusCode = require('../statusCode');
const axios = require('axios');
const yup = require('yup');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const errorMessageReturn = (message, status) => ({ err: { status, message } });

const getCompleteAddress = async cep => {
  try {
    const address = await axios({
      method: 'get',
      url: `https://viacep.com.br/ws/${cep}/json/`,
      responseType: 'json',
    }).then(response => response.data);
    return address;
  } catch (error) {
    console.log(error);
    return errorMessageReturn(
      'error check the console for more info',
      statusCode.internalServerErrorStatus,
    );
  }
};

let schema = yup.object().shape({
  fullName: yup.string().required().max(120),
  phone: yup.string().nullable(),
  cellphone: yup.number().required().positive().integer(),
  specialties: yup.array().required().min(2),
  cep: yup.string().required(),
});

const getAllDevelopers = async () => {
  try {
    const developers = await Developer.findAll();
    if (!developers) {
      return errorMessageReturn(
        'No developers found',
        statusCode.notFoundStatus,
      );
    }
    return developers;
  } catch (error) {
    console.log(error);
    return errorMessageReturn(
      'error check the console for more info',
      statusCode.internalServerErrorStatus,
    );
  }
};

const insertNewDeveloper = async developerInfo => {
  try {
    const { fullName, cellphone, phone, specialties, cep } = developerInfo;

    await schema
      .validate({ fullName, cellphone, phone, specialties: specialties.split(','), cep })
      .then(valid => valid);

    const address = await getCompleteAddress(cep);

    const {
      logradouro: street,
      bairro: neighborhood,
      localidade: city,
      uf: state,
    } = address;

    const result = await Developer.create({
      fullName,
      cellphone,
      phone,
      specialties,
      cep,
      street,
      neighborhood,
      city,
      state,
    });
    return result;
  } catch (error) {
    console.log(error);
    return errorMessageReturn(
      `Server error: ${error}`,
      statusCode.internalServerErrorStatus,
    );
  }
};

const deleteDeveloperById = async developerId => {
  try {
    const developer = await Developer.findByPk(developerId);
    if (developer === null) {
      return errorMessageReturn(
        'Developer not found',
        statusCode.notFoundStatus,
      );
    }
    await developer.destroy();
    return developer;
  } catch (error) {
    console.log(error);
    return errorMessageReturn(
      `Server error: ${error}`,
      statusCode.internalServerErrorStatus,
    );
  }
};

const updateDeveloperById = async (developerId, developerInfo) => {
  try {
    const { fullName, cellphone, phone, specialties, cep } = developerInfo;

    await schema
      .validate({ fullName, cellphone, phone, specialties, cep })
      .then(valid => valid);

    const address = await getCompleteAddress(cep);

    const specialtiesInString = specialties.join(', ');

    const {
      logradouro: street,
      bairro: neighborhood,
      localidade: city,
      uf: state,
    } = address;

    const developer = await Developer.findByPk(developerId);

    if (developer === null) {
      return errorMessageReturn(
        'Developer not found',
        statusCode.notFoundStatus,
      );
    }
    await developer.update({
      fullName,
      cellphone,
      phone,
      specialties: specialtiesInString,
      cep,
      street,
      neighborhood,
      city,
      state,
    });
    return developer;
  } catch (erro) {
    console.log(error);
    return errorMessageReturn(
      `Server error: ${error}`,
      statusCode.internalServerErrorStatus,
    );
  }
};

const developerNotFount = errorMessageReturn(
  'Developer not found',
  statusCode.notFoundStatus,
);

const serverErroMessage = error =>
  errorMessageReturn(
    `Server error: ${error}`,
    statusCode.internalServerErrorStatus,
  );

const getDeveloperByFullName = async fullName => {
  try {
    const developer = await Developer.findOne({ where: { fullName } });
    if (developer === null) {
      return developerNotFount;
    }
    return developer;
  } catch (error) {
    console.log(error);
    return serverErroMessage(error);
  }
};

const getDeveloperByCellphone = async cellphone => {
  try {
    const developer = await Developer.findOne({ where: { cellphone } });
    if (developer === null) {
      return developerNotFount;
    }
    return developer;
  } catch (error) {
    console.log(error);
    return serverErroMessage(error);
  }
};

const getDeveloperByCep = async cep => {
  try {
    const developer = await Developer.findAll({ where: { cep } });
    if (developer === null) {
      return developerNotFount;
    }
    return developer;
  } catch (error) {
    console.log(error);
    return serverErroMessage(error);
  }
};

const getDeveloperBySpeciality = async speciality => {
  try {
    const developers = await Developer.findAll({
      where: {
        specialties: {
          [Op.like]: `%${speciality}%`,
        },
      },
    });
    if (!developers) {
      return developerNotFount;
    }
    return developers;
  } catch (error) {
    console.log(error);
    return serverErroMessage(error);
  }
};

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
