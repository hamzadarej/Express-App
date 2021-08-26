const express = require("express");
const router = express.Router();
const { checkOld, checkData, getUser,checkBelong ,userFirstLetterUpperCase,toolStackAlpha,ageAndFbwToNumber} = require("../middlewares/middleware");

const {
  getOneUser,
  getAllUser,
  addNewUser,
  updateUserData,
  updateAllUsersData,
} = require("../controllers/userController");
// root route
// GET all users , POST new user
router.route("/").get(getAllUser).post(ageAndFbwToNumber,toolStackAlpha,userFirstLetterUpperCase,checkBelong,checkData, checkOld, addNewUser);
// route with name value
router
  .route("/:userName")
  .get(getUser,getOneUser)
  .patch(getUser, updateAllUsersData)
  .put(getUser, updateUserData);

module.exports = router; 
