const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'test',
  },
  question: {
    type: String,
    required: true,
  },
  correct_option: {
    type: String,
    required: true,
  },
  options: [ String, ],
  // mark: {
  //   type: Number,
  //   required: true,
  // }
})

module.exports = mongoose.model('question', QuestionSchema)