const CandidateModel = require('../models/candidate')

class CandidateService {
  static async findAll() {
    return CandidateModel.find()
  }

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return CandidateModel.find({name: pattern})
  }

  static async findByUsername(username) {
    return CandidateModel.findOne({username})
  }

  static async findById(id) {
    return CandidateModel.findById(id)
  }

  static async save(dao) {
    return CandidateModel.create(dao)
  }

  static async removeOne(id) {
    return CandidateModel.findByIdAndRemove(id)
  }
}

module.exports = CandidateService