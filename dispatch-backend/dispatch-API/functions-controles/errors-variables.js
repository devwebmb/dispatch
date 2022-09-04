//erreurs 400
exports.emptyField = {
  code: "4000",
  message: "Votre champs ne doit pas être vide",
};

exports.invalidEmailFormat = {
  code: "4001",
  message: "Votre adresse mail renseignée n'a pas un  format valide",
};

exports.emailNotAvailable = {
  code: "4002",
  message : "L'adresse mail est déjà présente dans la base de données, s'il s'agit de votre compte veuillez vous connecter avec votre adresse email et votre mot de passe."
}

//erreurs 401
exports.invalidPassword = {
  code: "4010",
  message:
    "le mot de passe ne correspond pas au mot de passe de l'adresse mail renseignée.",
};

//erreurs 404
exports.emailNotFound = {
  code: "4040",
  message:
    "l'utilisateur n'existe pas, l'adresse mail renseignée n'est pas présente dans la base de données.",
};

exports.freelanceNotFound = {
    code: "4041",
    message : "Le freelance dont on veut modifier les données n'existe pas dans la base de données"
}

//erreurs 500
exports.internalServerError = {
  code: "5000",
  message:
    "Erreur de serveur, réessayer dans un instant.",
};
