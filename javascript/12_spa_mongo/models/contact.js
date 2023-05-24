const mongoose = require("mongoose");

//create a schema for contacts
let Schema = mongoose.Schema({
  "firstname": String,
  "lastname": { "type": String, "index": true },
  "email": String,
  "phone": String
})

//model the schema
module.exports = mongoose.model("Contact", Schema);