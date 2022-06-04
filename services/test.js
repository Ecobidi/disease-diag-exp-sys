const TestModel = require('../models/test')

class TestService {
  static async findAll() {
    return TestModel.find()
  }

  static async findAllPublished() {
    return TestModel.find({published: true})
  }

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return TestModel.find({name: pattern})
  }

  static async findById(id) {
    return TestModel.findById(id)
  }

  static async save(dao) {
    return TestModel.create(dao)
  }

  static async publish(id) {
    return TestModel.findByIdAndUpdate(id, {$set: { published: true}})
  }

  static async removeOne(id) {
    return TestModel.findByIdAndRemove(id)
  }
}

module.exports = TestService