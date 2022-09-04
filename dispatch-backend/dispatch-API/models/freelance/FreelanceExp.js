module.exports = (sequelize, Datatypes) => {
  return sequelize.define("freelanceExp", {
    freelanceId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    expTitle: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    expContent: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
};
