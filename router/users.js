const express = require("express");
const router = express.Router();
const {
  checkOld,
  checkData,
  checkBelong,
  getUser,
} = require("../middlewares/middleware");

const {
  getOneUser,
  getAllUser,
  addNewUser,
  updateUserData,
  updateAllUsersData,
} = require("../controllers/userController");
// root route
// GET all users , POST new user
const middleware = [checkData, checkBelong, checkOld, addNewUser];

//http://localhost:5001/Users/ to get all Users
router.route("/").get(getAllUser).post(middleware);
// route with name value
router
  .route("/:userName")
  .get(getUser, getOneUser)
  .patch(getUser, updateAllUsersData)
  .put(getUser, updateUserData);

module.exports = router;
