module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define(
    'Developer',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fullName: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      phone: DataTypes.STRING,
      specialties: DataTypes.STRING,
      cep: DataTypes.STRING,
      street: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return Developer;
};
