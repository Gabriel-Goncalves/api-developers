'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Developers', [{
      fullName: "Gabriel Gonçalves Medeiros",
      cellphone: "55532541",
      phone: null,
      specialties: "JavaScript Python CSHARP",
      cep: "74000000",
      street: "Rua dos Alfeneiros",
      neighborhood: "Little Whingeing",
      city: "Surrey",
      state: "England",
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Developers', null, {});
  }
};
