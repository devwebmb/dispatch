module.exports = (sequelize, Datatypes) => {
  return sequelize.define("freelanceExp", {
    freelanceId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    expTitle: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Veuillez entrer un titre à votre expérience",
        },
      },
    },
    expContent: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Veuillez entrer un titre à votre expérience",
        },
      },
    },
  });
};
