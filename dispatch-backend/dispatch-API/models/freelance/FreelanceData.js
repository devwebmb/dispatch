module.exports = (sequelize, Datatypes) => {
  return sequelize.define("freelanceData", {
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: {
        msg: "Cet adresse mail est déjà utilisée.", // Gère l'unicité de l'adresse mail dans la bdd
      },
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    profilImgUrl: {
      type: Datatypes.STRING,
    },
    pseudo: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
    },
    lastname: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    societyName: {
      type: Datatypes.STRING,
    },
  });
};
