const CandidateService = require('../services/candidate')
const QuestionService = require('../services/question')
const TestService = require('../services/test')
const ResultService = require('../services/result')

class CandidatePageController {

  static async getLoginpage(req, res) {
    res.render('candidate/login')
  }

  static async handleLogin(req, res) {
    let candidate = await CandidateService.findByUsername(req.body.username) 
    if (candidate && candidate.password == req.body.password) {
      req.session.candidate = candidate
      res.redirect('/c/home')
    } else {
      req.flash('error_msg', 'Bad login credentials')
      res.redirect('/c/login?error=true')
    }
  }

  static async getHomepage(req, res) {
    res.render('candidate/home')
  }

  static async viewPublishedTests(req, res) {
    let tests = await TestService.findAllPublished()
    res.render('candidate/tests', { tests })
  }

  static async takeTestPage(req, res) {
    try {
      let test = await TestService.findById(req.query.test_id)
      if (test) {
        let questions = await QuestionService.findByTest(test._id)
        res.render('candidate/take-test', {test, questions})
      } else {
        throw new Error('Error fetching test')
      }
    } catch (error) {
      console.log(error)
      req.flash('error_msg','Error fetching test')
      res.redirect('/c/tests')
    }
  }

  static async submitTest(req, res) {
    let resultTemplate = { 
      test: req.body.test,
      questions: [],
      score_percentage: 0,
      candidate: req.session.candidate._id,
     }
    let each_score_mark = 100 / req.body.questions.length
    let questions = await QuestionService.findByTest(req.body.test)

    // only questions sent to the candidate
    questions = questions.filter(({_id}) => req.body.questions.includes("" + _id) )
    questions.forEach(q => {
      if (req.body.chosen_options[q._id] === q.correct_option) {
        resultTemplate.score_percentage += each_score_mark
      }
      resultTemplate.questions.push({ 
        question: q.question, 
        options: q.options, 
        selected_option: req.body.chosen_options[q._id], correct_option: q.correct_option, })
    })

    let result = await ResultService.save(resultTemplate)
    res.redirect('/c/results/' + result._id)
  }

  static async viewPreviousResults(req, res) {
    let results = await ResultService.findByCandidate(req.session.candidate._id)
    res.render('candidate/results', { results })
  }

  static async viewResultInfo(req, res) {
    let result = await ResultService.findById(req.params.result_id)
    let number_of_correct_answers = 0
    result.questions.forEach(q => { if (q.selected_option == q.correct_option) number_of_correct_answers ++ } )
    res.render('candidate/result-info', { result, number_of_correct_answers })
  }
}

module.exports = CandidatePageController