const mongoose = require('mongoose')

let CandidateSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  fullname: String,
  dob: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: '1234',
  },
})

module.exports = mongoose.model('candidate', CandidateSchema)