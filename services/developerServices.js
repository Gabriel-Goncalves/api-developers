const { Developer } = require('../models');
const statusCode = require('../statusCode');
const axios = require('axios');
const yup = require('yup');

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

    await schema.validate({fullName, cellphone, phone, specialties, cep}).then(valid => valid);

    const address = await getCompleteAddress(cep);

    const {
      logradouro: street,
      bairro: neighborhood,
      localidade: city,
      uf: state,
    } = address;

    const specialtiesInString = specialties.join(', ');

    const result = await Developer.create({
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
    return result;
  } catch (error) {
    console.log(error);
    return errorMessageReturn(`Server error: ${error}`, statusCode.internalServerErrorStatus);
  }
};

module.exports = {
  getAllDevelopers,
  insertNewDeveloper,
};
