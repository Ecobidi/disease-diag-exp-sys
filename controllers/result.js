const ResultService = require('../services/result')

class ResultController {
  static async getResultsPage(req, res) {
    let results = await ResultService.findAll()
    res.render('admin/results', { results })
  }

  static async getResultInfo(req, res) {
    let result = await ResultService.findById(req.params.result_id)
    let number_of_correct_answers = 0
    result.questions.forEach(q => { if (q.selected_option == q.correct_option) number_of_correct_answers ++ } )
    res.render('admin/result-info', { result, number_of_correct_answers })
  }
}

module.exports = ResultController