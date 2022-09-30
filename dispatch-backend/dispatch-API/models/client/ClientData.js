module.exports = (sequelize, Datatypes) => {
  return sequelize.define("clientProfil", {
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    profilImgUrl: {
      type: Datatypes.STRING,
    },

    societyName: {
      type: Datatypes.STRING,
    },
  });
};
