const router = require('express').Router()
const CandidateController = require('../../controllers/candidate')

router.get('/', CandidateController.getAllCandidates)

router.get('/view/:candidate_id', CandidateController.getCandidateInfo)

router.get('/new', CandidateController.createCandidatePage)

router.post('/new', CandidateController.createCandidate)

router.get('/remove/:candidate_id', CandidateController.removeCandidate)

module.exports = router