module.exports = (sequelize, Datatypes) => {
  return sequelize.define("freelanceExpertise", {
    freelanceId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    freelanceExpertise: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
};
