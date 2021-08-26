const usersData = require("../model/usersModel");

// Middleware

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await usersData.findOne({
      userName: req.params.userName,
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
  let result;
  const dates = ["userName", "userPass", "age", "fbw", "email"];

  try {
    data = await req.body;
    let dataKeys = Object.keys(data);
    for (let i = 0; i < dates.length; i++) {
      if (dataKeys.includes(dates[i])) {
        result = true;
      } else {
        result = false;
      }
    }
  if (!result) {
      return res.status(404).json({ message: "Sorry, data is messing ." });
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
// Get one Employee
const getOneUser = async (req, res) => {
  res.status(200).json(res.user);
};

// View all users

const getAllUser = async (req, res) => {
  try {
    const users = await usersData.find();
    res.status(200).json(
      users.map((user) => {
        return {
          Id: user._id,
          userName: user.userName,
          userPass: user.userPass,
          age: user.age,
          fbw: user.fbw,
          toolStack: user.toolStack,
          email: user.email,
          request: {
            type: "GET",
            url: `http://localhost:5001/users/${user.userName}`,
          },
        };
      })
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new user
const addNewUser = async (req, res) => {
  const userFirstLetterUpperCase = () => {
    const username = req.body.userName;
    return username[0].toUpperCase() + username.slice(1);
  };
  console.log(userFirstLetterUpperCase());
  const user = new usersData({
    userName: userFirstLetterUpperCase(),
    userPass: req.body.userPass,
    age: req.body.age,
    fbw: req.body.fbw,
    toolStack: req.body.toolStack,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// update user up on their name (put)
const updateUserData = async (req, res) => {
  try {
    await usersData.updateOne(
      { userName: req.params.userName },
      {
        $set: {
          userName: req.body.userName,
        },
        $currentDate: {
          userAddedDate: Date.now,
        },
      }
    );

    res.status(200).json({ message: "User Got updates" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update some user data (patch)

const updateManyUsers = async (req, res) => {
  try {
    await usersData.updateMany(
      {
        userName: req.params.userName,
      },
      {
        $set: {
          userName: req.body.userName,
          userPass: req.body.userPass,
          age: req.body.age,
          fbw: req.body.fbw,
          toolStack: req.body.toolStack,
          email: req.body.email,
        },
      }
    );

    res.status(200).json({ message: "Add got update" });
    console.log(req.params.userName);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  getAllUser,
  getOneUser,
  addNewUser,
  updateUserData,
  updateManyUsers,
  checkOld,
  checkData,
};
