const CategoryService = require('../services/category')
const QuestionService = require('../services/question')
const TestService = require('../services/test')

class TestController {
  static async getTestsPage(req, res) {
    let tests = []
    if (req.query.search) {
      tests = await TestService.findByName(req.query.search)
    } else {
      tests = await TestService.findAll()
    }
    let categories = await CategoryService.findAll()
    res.render('admin/tests', { categories, tests })
  }

  static async eachTestPage(req, res) {
    try {
      let test = await TestService.findById(req.params.test_id)
      if (test) {
        let questions = await QuestionService.findByTest(test._id)
        res.render('admin/each-test', {test, questions})
      } else {
        throw new Error('Error fetching test')
      }
    } catch (error) {
      console.log(error)
      req.flash('error_msg','Error fetching test')
      res.redirect('/tests')
    }
  }

  static async createTest(req, res) {
    let dao = req.body
    dao.hasDurationLimit = dao.duration <= 0 ? false : true
    try {
      await TestService.save(dao)
      req.flash('success_msg', 'Test saved')
      res.redirect('/tests')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error saving test')
      res.redirect('/tests')
    }
  }

  static async publishTest(req, res) {
    try {
      await TestService.publish(req.body.test_id)
      req.flash('success_msg', 'Test published')
      res.redirect('/tests')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error publishing test')
      res.redirect('/tests')    
    }
  }

  static async removeTest(req, res) {
    try {
      await TestService.removeOne(req.params.test_id)
      req.flash('success_msg', 'test removed')
      res.redirect('/tests')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error removing test')      
      res.redirect('/tests')
    }
  }

}

module.exports = TestController