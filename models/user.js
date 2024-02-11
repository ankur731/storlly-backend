const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateOfBirth: {
    type:Date
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
