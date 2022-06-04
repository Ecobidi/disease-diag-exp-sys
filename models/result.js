const mongoose = require('mongoose')

let ResultSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'test',
  },
  questions: [
    {
      question: String,
      selected_option: String,
      options: [ String, ],
      correct_option: String,
    }
  ],
  score_percentage: {
    type: Number,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('result', ResultSchema)