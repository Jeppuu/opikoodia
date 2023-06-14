const mongoose = require("mongoose");

//make a schema of the user
let Schema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String
})

module.exports = mongoose.model("User", Schema);