const QuestionModel = require('../models/question')

class QuestionService {
  static async findAll() {
    return QuestionModel.find().populate('test')
  }

  static async findById(id) {
    return QuestionModel.findById(id).populate('test')
  }

  static async findByTest(test_id) {
    return QuestionModel.find({test: test_id}).populate('test')
  }

  static async save(dao) {
    return QuestionModel.create(dao)
  }

  static async removeOne(id) {
    return QuestionModel.findByIdAndRemove(id)
  }
}

module.exports = QuestionService