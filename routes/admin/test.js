const router = require('express').Router()
const TestController = require('../../controllers/test')

router.get('/', TestController.getTestsPage)

router.get('/view/:test_id', TestController.eachTestPage)

router.post('/new', TestController.createTest)

router.post('/publish', TestController.publishTest)

router.get('/remove/:test_id', TestController.removeTest)

module.exports = router