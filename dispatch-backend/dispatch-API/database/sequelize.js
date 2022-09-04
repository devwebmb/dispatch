const { Sequelize, DataTypes } = require("sequelize");
const FreelanceDataModel = require("../models/freelance/FreelanceData");
const FreelanceExpModel = require("../models/freelance/FreelanceExp");
const ClientProfilModel = require("../models/client/ClientData");
require("dotenv").config();

// création d'une instance sequelize (paramètres de connexions)
const dataBase = new Sequelize(
  `dispatch`, // nom de la bdd
  `root`, // nom utilisateur
  ``, // mdp utilisateur
  {
    host: `localhost`, // où se trouve la bdd
    dialect: "mariadb", // dialecte pour sequelize pour interragir avec la bdd
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    login: false,
  }
);

// test de la connexion
dataBase
  .authenticate()
  .then(() => console.log("Connexion à la base de données réussie"))
  .catch((error) =>
    console.log({
      error,
      message: "Impossible de se connecter à la base de données",
    })
  );

const FreelanceData = FreelanceDataModel(dataBase, DataTypes);
const FreelanceExp = FreelanceExpModel(dataBase, DataTypes);
const ClientProfil = ClientProfilModel(dataBase, DataTypes);

// initialiser la bdd avec la création d'un administrateur
const initDb = () => {
  return dataBase.sync({ force: true }).then(() => {
    console.log("la base de données est initialisée.");
  });
};

module.exports = { initDb, FreelanceData, FreelanceExp, ClientProfil };
