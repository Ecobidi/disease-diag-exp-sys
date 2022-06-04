const router = require('express').Router()
const CandidateActionsController = require('../../controllers/candidates-controller')

const authMiddleware = (req, res, next) => {
  if (req.session.candidate) next()
  else res.redirect('/c/login')
}

router.get('/login', CandidateActionsController.getLoginpage)

router.post('/login', CandidateActionsController.handleLogin)

router.use('/', authMiddleware)

router.use('/logout', (req, res) => {
  req.session.candidate = null
  res.redirect('/c/login')
})

router.get('/', CandidateActionsController.getHomepage)

router.get('/home', CandidateActionsController.getHomepage)

router.get('/take-test', CandidateActionsController.takeTestPage)

router.get('/tests', CandidateActionsController.viewPublishedTests)

router.post('/submit-test', CandidateActionsController.submitTest)

router.get('/results', CandidateActionsController.viewPreviousResults)

router.get('/results/:result_id', CandidateActionsController.viewResultInfo)

module.exports = router