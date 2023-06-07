const mongoose = require('mongoose');

//create a schema
let Schema = mongoose.Schema({
  user: { type: String, index: true },
  type: String,
  count: Number,
  price: Number
})

module.exports = mongoose.model("Item", Schema);