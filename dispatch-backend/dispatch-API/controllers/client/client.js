const { ClientProfil } = require("../../database/sequelize");
const bcrypt = require("bcrypt");
const validator = require("email-validator");

const { ValidationError, UniqueConstraintError } = require("sequelize");
const responseBuilder = require("../../functions-controles/response-builders");
const errorsMessage = require("../../functions-controles/errors-variables");
const validMessages = require("../../functions-controles/valid-variables");

//inscription connexion

//inscription client

//hachage du mot de passe et création du client
exports.signup = (req, res, next) => {
  //vérification du champs vide de l'adresse mail et du mdp
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json(
        responseBuilder.buildErrorResponse(
          errorsMessage.emptyField.code,
          errorsMessage.emptyField.message
        )
      );
  }
  //vérification du format de l'adresse email
  if (!validator.validate(req.body.email)) {
    return res
      .status(400)
      .json(
        responseBuilder.buildErrorResponse(
          errorsMessage.invalidEmailFormat.code,
          errorsMessage.invalidEmailFormat.message
        )
      );
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    ClientProfil.create({
      email: req.body.email,
      password: hash,
      lastname: "",
      firstname: "",
      societyName: "",
    })
      .then((client) => {
        return res
          .status(201)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.createClient.message,
              client
            )
          );
      })
      .catch((error) => {
        if (error instanceof UniqueConstraintError) {
          return res
            .status(400)
            .json(
              responseBuilder.buildErrorResponse(
                errorsMessage.emailNotAvailable.code,
                errorsMessage.emailNotAvailable.message
              )
            );
        }
        const message =
          "L'utilisateur n'a pas pu être créé, réessayer dans un instant.";
        return res.status(500).json({ message, data: error });
      });
  });
};

//connexion freelance

exports.login = (req, res, next) => {
  //vérification du champs vide de l'adresse mail et du mdp
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json(
        responseBuilder.buildErrorResponse(
          errorsMessage.emptyField.code,
          errorsMessage.emptyField.message
        )
      );
  }
  //recherche du client dans la bdd
  ClientProfil.findOne({
    where: { email: req.body.email },
  })
    .then((client) => {
      if (!client) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.emailNotFound.code,
              errorsMessage.emailNotFound.message
            )
          );
      }
      bcrypt.compare(req.body.password, client.password).then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json(
              responseBuilder.buildErrorResponse(
                errorsMessage.invalidPassword.code,
                errorsMessage.invalidPassword.message
              )
            );
        }
        return res
          .status(200)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.connectClient.message,
              client
            )
          );
      });
    })
    .catch((error) => {
      const message =
        "l'utilisateur n'a pas être connecté, réessayez dans un instant";
      res.status(500).json({ message, data: error });
    });
};

// suppression d'un client

exports.deleteClient = (req, res, next) => {
  const id = req.params.id;
  ClientProfil.findOne({ where: { id: id } }).then((client) => {
    client.destroy().then(() => {
      return res
        .status(200)
        .json(
          responseBuilder.buildValidDeleteresponse(
            validMessages.deleteClient.message
          )
        );
    });
  });
};

//données de profil d'un client

// modification et ajout des données de profil d'un client

exports.updateProfilData = (req, res, next) => {
  const clientId = parseInt(req.params.id);
  const { email, lastname, firstname, societyName } = req.body;
  ClientProfil.findOne({ where: { id: clientId } })
    .then((clientProfil) => {
      if (!clientProfil) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.freelanceNotFound.code,
              errorsMessage.freelanceNotFound.message
            )
          );
      }
      if (clientProfil.profilImgUrl) {
        // suppression de l'ancienne image si l'on change l'image
        const filename =
          freelanceProfilData.profilImgUrl.split("/images/profil")[1];
        fs.unlink(`images/profil/${filename}`, () => {});
      }
    })
    .catch((error) => {
      const message =
        "La modification du profil a échoué, veuillez réessayer dans quelques instants.";
      return res.status(500).json({ message, data: error });
    });
  if (req.file) {
    // s'il y a un fichier image
    const file = `${req.file.filename}`;
    ClientProfil.update(
      {
        email,
        lastname,
        firstname,
        societyName,
        profilImgUrl: `${req.protocol}://${req.get(
          "host"
        )}/images/profil/${file}`,
      },
      {
        where: {
          id: clientId,
        },
      }
    )
      .then(() => {
        ClientProfil.findOne({ where: { id: clientId } })
          .then((profil) => {
            return res
              .status(200)
              .json(
                responseBuilder.buildValidresponse(
                  validMessages.updateClientProfilData.message,
                  profil
                )
              );
          })
          .catch((error) => {
            const message =
              "La modification du profil a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
          });
      })
      .catch((error) => {
        const message =
          "La modification du profil a échoué, veuillez réessayer dans quelques instants.";
        return res.status(500).json({ message, data: error });
      });
  } else {
    ClientProfil.update(
      // s'il n'y a pas de fichier image
      {
        email,
        lastname,
        firstname,
        societyName,
      },
      {
        where: {
          id: clientId,
        },
      }
    )
      .then(() => {
        ClientProfil.findOne({ where: { id: clientId } }).then((profil) => {
          return res
            .status(200)
            .json(
              responseBuilder.buildValidresponse(
                validMessages.updateClientProfilData.message,
                profil
              )
            );
        });
      })
      .catch((error) => {
        const message =
          "La modification du profil a échoué, veuillez réessayer dans quelques instants.";
        return res.status(500).json({ message, data: error });
      });
  }
};
