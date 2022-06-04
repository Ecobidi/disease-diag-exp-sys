const router = require('express').Router()
const ResultController = require('../../controllers/result')

router.get('/', ResultController.getResultsPage)

router.get('/:result_id', ResultController.getResultInfo)

module.exports = router