const ResultModel = require('../models/result')

class ResultService {
  static async findAll(query = {}) {
    return ResultModel.find(query).populate('candidate test')
  }

  static async findById(id) {
    return ResultModel.findById(id).populate('candidate test')
  }

  static async findByCandidate(candidate_id) {
    return ResultModel.find({candidate: candidate_id}).populate('candidate test')
  }

  static async save(dao) {
    return ResultModel.create(dao)
  }

  static async removeOne(id) {
    return ResultModel.findByIdAndRemove(id)
  }
}

module.exports = ResultService