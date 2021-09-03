const usersData = require("../model/usersModel");
// Middleware
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await usersData.findOne({
      userName: req.params.userName,
    });

    if (user == null) {
      return res.status(404).json({ message: "Sorry, USER NOT FOUND." });
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
    old = Number(req.body.age);

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
    fbw = Number(req.body.fbw);
    if (fbw !== 48) {
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

const toolStackAlpha = async (req, res, next) => {
  const { toolStack } = res.user;
  res.user.toolStack = toolStack.sort();
  next();
};
const ageAndFbwToNumber = async (req, res, next) => {
  const { age, fbw } = res.user;

  res.user.age = parseInt(age);
  res.user.fbw = parseInt(fbw);
  next();
};
const firstLetterUpperCase = async (req, res, next) => {
  const { userName } = res.user;
  res.user.userName = userName[0].toUpperCase()+userName.slice(1).toLowerCase();
  next();
};

module.exports = {
  checkOld,
  checkData,
  checkBelong,
  toolStackAlpha,
  ageAndFbwToNumber,
  firstLetterUpperCase,
  getUser

};
