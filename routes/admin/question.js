const router = require('express').Router()
const QuestionController = require('../../controllers/question')

router.get('/', QuestionController.getQuestionsOfTest)

router.post('/new', QuestionController.createQuestion)

router.get('/remove/:test_id', QuestionController.removeQuestion)

module.exports = router