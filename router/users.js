const express = require("express");
const router = express.Router();
const {
  checkOld,
  checkData,
  toolStackAlpha,
  checkBelong,
  firstLetterUpperCase,
  ageAndFbwToNumber,
} = require("../middlewares/middleware");

const {
  getOneUser,
  getAllUser,
  addNewUser,
  displayUser,
  updateUserData,
  updateAllUsersData,
  getUser,
} = require("../controllers/userController");
// root route
// GET all users , POST new user
const middleware = [
  checkData,
  checkBelong,
  checkOld,
  addNewUser,
];
router
.route("/display/:userName")
.get(firstLetterUpperCase,displayUser); 
//http://localhost:5001/Users/ to get all Users 
router.route("/").get(getAllUser).post(middleware);
// route with name value
router
  .route("/:userName")
  .get(getUser,getOneUser) 
  .patch(getUser, ageAndFbwToNumber, toolStackAlpha, updateAllUsersData)
  .put(getUser, updateUserData);

module.exports = router;
