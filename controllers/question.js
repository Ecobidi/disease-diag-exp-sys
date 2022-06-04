const QuestionService = require('../services/question')

function shuffleArray(array) {
  let random, temp
  for (let i = 0; i < array.length; i++) {
    random = Math.floor(Math.random() * array.length)
    temp = array[random]
    array[random] = array[i]
    array[i] = temp
  }
  return array
}

class QuestionController {
  static async getQuestionsOfTest(req, res) {
    let questions = []
    if (req.query.test_id) {
      questions = await QuestionService.findByTest(req.query.test_id)
    } else {
      questions = await QuestionService.findAll()
    }
    res.render('admin/questions', { questions })
  }

  static async createQuestion(req, res) {
    let dao = req.body
    dao.options = [dao['option-a'], dao['option-b'], dao['option-c'], dao['option-d']]
    shuffleArray(dao.options)

    let obj = { 
      test: dao.test, 
      options: dao.options, 
      correct_option: dao['option-' + dao.correct_option],
      question: dao.question 
    }

    try {
      await QuestionService.save(obj)
      req.flash('success_msg', 'Question added')
      res.redirect('/tests/view/' + obj.test)
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error saving question')
      res.redirect('/tests/view/' + obj.test)
    }
  }

  static async removeQuestion(req, res) {
    try {
      await QuestionService.removeOne(req.params.question_id)
      req.flash('success_msg', 'Question removed')
      res.redirect('/questions')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error removing question')      
      res.redirect('/questions')
    }
  }

}

module.exports = QuestionController