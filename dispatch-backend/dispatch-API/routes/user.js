const express = require("express");
const multer = require("../middlewares/multer-config");
const router = express.Router();

const freelanceCtrl = require("../controllers/freelance/freelance");
const clientCtrl = require("../controllers/client/client");

//freelance

//post
router.post("/freelance/signup", freelanceCtrl.signup);
router.post("/freelance/login", freelanceCtrl.login);
router.post("/freelance/freelanceExp", freelanceCtrl.addFreelanceExp);

//delete
router.delete("/freelance/freelanceExp/:id", freelanceCtrl.deleteFreelanceExp);
router.delete(
  "/freelance/allFreelanceExp/:id",
  freelanceCtrl.deleteAllFreelanceExp
);
router.delete("/freelance/:id", freelanceCtrl.deleteFreelance);

//update
router.put("/freelance/freelanceExp/:id", freelanceCtrl.updateFreelanceExp);
router.put("/freelance/profilData/:id", freelanceCtrl.updateProfilData);

//client

//post
router.post("/client/signup", clientCtrl.signup);
router.post("/client/login", clientCtrl.login);

//delete
router.delete("/client/:id", clientCtrl.deleteClient);

//update
router.put("/client/profilData/:id", clientCtrl.updateProfilData)

module.exports = router;
