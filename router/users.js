const express = require("express");
const router = express.Router();

const {
  getUser,
  getOneUser,
  getAllUser,
  addNewUser,
  updateUserData,
  updateManyUsers,
} = require("../controllers/userController");
// root route
// GET all users , POST new user
router.route("/").get(getAllUser).post(addNewUser);
// route with name value
router
  .route("/:userName")
  .get(getUser, getOneUser)
  .patch(getUser, updateManyUsers)
  .put(getUser, updateUserData);



module.exports = router;
