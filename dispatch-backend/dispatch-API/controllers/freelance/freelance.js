const { FreelanceData } = require("../../database/sequelize.js");
const { FreelanceExp } = require("../../database/sequelize");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const responseBuilder = require("../../functions-controles/response-builders");
const errorsMessage = require("../../functions-controles/errors-variables");
const validMessages = require("../../functions-controles/valid-variables");
const jwt = require("jsonwebtoken");

//inscription connexion

//inscription freelance
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

  //hachage du mot de passe et création du freelance
  bcrypt.hash(req.body.password, 10).then((hash) => {
    FreelanceData.create({
      email: req.body.email,
      password: hash,
      birthdate: req.body.birthdate,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      societyName: "",
    })
      .then((freelance) => {
        return res
          .status(201)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.createFreelance.message,
              freelance
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
        return res
          .status(500)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.internalServerError.code,
              errorsMessage.internalServerError.message,
              { error }
            )
          );
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
  //recherche du freelance dans la bdd
  FreelanceData.findOne({
    where: { email: req.body.email },
  })
    .then((freelance) => {
      if (!freelance) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.emailNotFound.code,
              errorsMessage.emailNotFound.message
            )
          );
      }
      bcrypt.compare(req.body.password, freelance.password).then((valid) => {
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
        const token = jwt.sign(
          // création d'un token d'authentification
          { userId: freelance.id },
          `CUSTOM_PRIVATE_KEY`,
          {
            expiresIn: "24h",
          }
        );
        return res
          .status(200)
          .json(
            responseBuilder.buildValidresponse(
              validMessages.connectFreelance.message,
              { token, freelance }
            )
          );
      });
    })
    .catch((error) => {
      const message =
        "l'utilisateur n'a pas être connecté, réessayez dans un instant";
      res.status(500).json({ message, error });
    });
};

//suppression d'un freelance

exports.deleteFreelance = (req, res, next) => {
  const id = req.params.id;
  FreelanceData.findOne({ where: { id: id } }).then((freelance) => {
    if (!freelance) {
      return res
        .status(404)
        .json(
          responseBuilder.buildErrorResponse(
            errorsMessage.freelanceNotFound.code,
            errorsMessage.freelanceNotFound.message
          )
        );
    }
    freelance
      .destroy()
      .then(() => {
        FreelanceExp.destroy({ where: { freelanceId: id } });
      })
      .then(() => {
        FreelanceExp.destroy({ where: { freelanceId: id } });
      })
      .then(() => {
        return res
          .status(200)
          .json(
            responseBuilder.buildValidDeleteresponse(
              validMessages.deleteFreelance.message
            )
          );
      });
  });
};

//récupérer freelance

//récupérer tous le freelances

exports.getAllFreelances = (req, res, next) => {
  FreelanceData.findAll()
    .then((data) => {
      return res
        .status(200)
        .json(
          responseBuilder.buildValidresponse(
            validMessages.getAllfreelances.message,
            data
          )
        );
    })
    .catch((error) => {
      return res
        .status(500)
        .json(
          responseBuilder.buildErrorResponse(
            errorsMessage.internalServerError.code,
            errorsMessage.internalServerError.message,
            { error }
          )
        );
    });
};

//récupérer 1 freelance avec son id
//Données de profil du freelance

exports.getOneFreelance = (req, res, next) => {
  const id = req.params.id;
  FreelanceData.findOne({ where: { id: id } })
    .then((freelance) => {
      if (!freelance) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.freelanceNotFound.code,
              errorsMessage.freelanceNotFound.message
            )
          );
      }
      return res
        .status(200)
        .json(
          responseBuilder.buildValidresponse(
            validMessages.getOneFreelance,
            freelance
          )
        );
    })
    .catch((error) => {
      return res
        .status(500)
        .json(
          responseBuilder.buildErrorResponse(
            errorsMessage.internalServerError.code,
            errorsMessage.internalServerError.message,
            { error }
          )
        );
    });
};
//modification et ajout des données de profil d'un freelance

exports.updateProfilData = (req, res, next) => {
  const freelanceId = parseInt(req.params.id);
  const { email, birthdate, lastname, firstname, societyName } = req.body;
  FreelanceData.findOne({ where: { id: freelanceId } })
    .then((freelanceProfilData) => {
      if (!freelanceProfilData) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.freelanceNotFound.code,
              errorsMessage.freelanceNotFound.message
            )
          );
      }
      if (freelanceProfilData.profilImgUrl) {
        // suppression de l'ancienne image si l'on change l'image
        const filename =
          freelanceProfilData.profilImgUrl.split("/images/profil")[1];
        fs.unlink(`images/profil/${filename}`, () => {});
      }
      if (req.file) {
        // s'il y a un fichier image
        const file = `${req.file.filename}`;
        FreelanceData.update(
          {
            email,
            birthdate,
            lastname,
            firstname,
            societyName,
            profilImgUrl: `${req.protocol}://${req.get(
              "host"
            )}/images/profil/${file}`,
          },
          {
            where: {
              id: freelanceId,
            },
          }
        )
          .then(() => {
            FreelanceData.findOne({
              where: {
                id: freelanceId,
              },
            })
              .then((profil) => {
                return res
                  .status(200)
                  .json(
                    responseBuilder.buildValidresponse(
                      validMessages.updateFreelanceProfilData.message,
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
        FreelanceData.update(
          // s'il n'y a pas de fichier image
          {
            email: email,
            birtdate: birthdate,
            lastname: lastname,
            firstname: firstname,
            societyName: societyName,
          },
          {
            where: {
              id: freelanceId,
            },
          }
        )
          .then(() => {
            FreelanceData.findOne({
              where: {
                id: freelanceId,
              },
            }).then((profil) => {
              return res
                .status(200)
                .json(
                  responseBuilder.buildValidresponse(
                    validMessages.updateFreelanceProfilData.message,
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
    })
    .catch((error) => {
      const message =
        "La modification du profil a échoué, veuillez réessayer dans quelques instants.";
      return res.status(500).json({ message, data: error });
    });
};

//expériences

//Ajout d'une expérience du freelance

exports.addFreelanceExp = (req, res, next) => {
  const { freelanceId, expContent, expTitle } = req.body;
  FreelanceExp.create({
    freelanceId,
    expTitle,
    expContent,
  })
    .then((exp) => {
      return res
        .status(201)
        .json(
          responseBuilder.buildValidresponse(
            validMessages.addFreelanceExp.message,
            exp
          )
        );
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, error }); // remontée des erreurs avec sequelize
      }
      const message =
        "L'ajout du profil a échoué, veuillez réessayer dans quelques instants.";
      return res.status(500).json({ message, data: error });
    });
};

//Modification d'une expérience de frelance

exports.updateFreelanceExp = (req, res, next) => {
  const { expContent, expTitle } = req.body;
  const freelanceId = parseInt(req.params.id);
  FreelanceExp.findOne({ where: { freelanceId: freelanceId } })
    .then((exp) => {
      if (!exp) {
        return res
          .status(404)
          .json(
            responseBuilder.buildErrorResponse(
              errorsMessage.freelanceNotFound.code,
              errorsMessage.freelanceNotFound.message
            )
          );
      }
      exp
        .update({
          expTitle,
          expContent,
        })
        .then((exp) => {
          return res
            .status(200)
            .json(
              responseBuilder.buildValidresponse(
                validMessages.updateFreelanceExp.message,
                exp
              )
            );
        })
        .catch((error) => {
          const message =
            "La modification a échoué, veuillez réessayer dans quelques instants.";
          return res.status(500).json({ message, data: error });
        });
    })
    .catch((error) => {
      const message =
        "La modification a échoué, veuillez réessayer dans quelques instants.";
      return res.status(500).json({ message, data: error });
    });
};

//suppression d'une expérience de freelance

exports.deleteFreelanceExp = (req, res, next) => {
  const id = parseInt(req.params.id);
  FreelanceExp.findByPk(id).then((exp) => {
    if (!exp) {
      return res
        .status(404)
        .json(
          responseBuilder.buildErrorResponse(
            errorsMessage.experienceNotFound.code,
            errorsMessage.experienceNotFound.message
          )
        );
    }
    exp
      .destroy()
      .then(() => {
        return res
          .status(200)
          .json(
            responseBuilder.buildValidDeleteresponse(
              validMessages.deleteFreelanceExp.message
            )
          );
      })
      .catch((error) => {
        const message =
          "La suppression du profil a échoué, veuillez réessayer dans quelques instants.";
        return res.status(500).json({ message, data: error });
      });
  });
};
