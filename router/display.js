const express = require("express");
const router = express.Router();
const {
  toolStackAlpha,
  firstLetterUpperCase,
  ageAndFbwToNumber,getUser
} = require("../middlewares/middleware");
const { displayUser } = require("../controllers/userController");
router
  .route("/:userName")
  .get(
    getUser,
    toolStackAlpha,
    ageAndFbwToNumber,
    firstLetterUpperCase,
    displayUser
  );
  module.exports = router;
