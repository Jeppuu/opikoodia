const mongoose = require('mongoose');

//create a schema
let Schema = mongoose.Schema({
  type: String,
  count: Number,
  price: Number
})

module.exports = mongoose.model("Item", Schema);