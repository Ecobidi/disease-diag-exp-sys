const mongoose = require('mongoose')

let TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  hasDurationLimit: {
    type: Boolean,
    default: false,
  },
  duration: { // in minutes
    type: Number,
  },
  pass_mark: {
    type: Number,
  },
  published: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('test', TestSchema)