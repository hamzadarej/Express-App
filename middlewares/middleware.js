const usersData = require("../model/usersModel");
// Middleware

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await usersData.findOne({
      userName: req.params.userName
    });

    if (user == null) {
      return res.status(404).json({ message: "Sorry, user NOT FOUND." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};
// check includes userName ,userPass, age,fbw ,email
const checkData = async (req, res, next) => {
  let data;
  const dates = ["userName", "userPass", "age", "fbw", "email"];
  try {
    data = await req.body;
    const dataKeys = Object.keys(data);
    for (let i = 0; i < dates.length; i++) {
      if (!dataKeys.includes(dates[i])) {
        return res.status(404).json({ message: "Sorry, data is messing ." });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.data = data;
  next();
};
//check old
const checkOld = async (req, res, next) => {
  let old;
  try {
    old = req.body.age;

    if (old < 18) {
      return res.status(404).json({ message: "Sorry, user is young." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.old = old;
  next();
};

//check user belongs to FBW
const checkBelong = async (req, res, next) => {
  let fbw;
  try {
    fbw = req.body.fbw;

    if (!fbw) {
      return res
        .status(404)
        .json({ message: "Sorry, user belong not to FBW." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.fbw = fbw;
  next();
};
const userFirstLetterUpperCase = async (req, res, next) => {
  let upperCase;
  try {
    const username = req.body.userName;
    upperCase = username[0].toUpperCase() + username.slice(1);
    console.log(upperCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  req.body.userName = upperCase;
  next();
};
const toolStackAlpha = async (req, res, next) => {
  let tools;
  try {
    const toolStack = req.body.toolStack;
    tools = toolStack.map((letter) => letter[0]);
    console.log(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  req.body.toolStack = tools;
  next();
};
const ageAndFbwToNumber = async (req, res, next) => {
  let ageToNumber;
  let fbwToNumber;
  try {
    const age = req.body.age;
    const fbw = req.body.fbw;
    ageToNumber = parseFloat(age);
    fbwToNumber = parseInt(fbw);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  req.body.age = ageToNumber;
  req.body.fbw = fbwToNumber;
  next();
};

module.exports = {
  checkOld,
  checkData,
  getUser,
  checkBelong,
  userFirstLetterUpperCase,
  toolStackAlpha,
  ageAndFbwToNumber,
};
