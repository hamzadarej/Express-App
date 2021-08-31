const mongoose = require("mongoose");
const usersDataSchema = new mongoose.Schema({
  userName: {
    type: String,
   trim: true,
    required: [true, "Name is must"],
    
  },
  userPass: {
    type: String,
    trim: true,
    required: [true],
  },
  age: {
    type: String,
    required: [true, "Write age please"],
  },
  fbw: {
    type: String,

    required: [true, "Write class please"],
  },
  toolStack: {
    type: Array,
    required: true,
  },

  email: String,
  userAddedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
// new collection
module.exports = mongoose.model("usersData", usersDataSchema);
