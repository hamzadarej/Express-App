const usersData = require("../model/usersModel");

// Controllers
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
// display UserName upperCase
const displayUser = async (req, res) => {
  try {
    const users = await usersData.find({ userName: req.params.userName });

    res.status(200).json(
      users.map((user) => {
        return {
          Id: user._id,
          userName: user.userName[0].toUpperCase() + user.userName.slice(1),
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
// Get one Employee
const getOneUser = async (req, res) => {
  res.status(200).json(res.user);
};
// Add new user
const addNewUser = async (req, res) => {
  const user = new usersData({
    userName: req.body.userName,
    userPass: req.body.userPass,
    age: req.body.age,
    fbw: req.body.fbw,
    toolStack: req.body.toolStack,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();

    res.status(201).json({ message: "new User Added successfully", newUser });
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

const updateAllUsersData = async (req, res) => {
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
  getAllUser,
  getOneUser,
  addNewUser,
  updateUserData,
  updateAllUsersData,
  getUser,
  displayUser,
};
