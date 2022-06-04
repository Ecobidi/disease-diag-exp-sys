const CandidateService = require('../services/candidate')
const ResultService = require('../services/result')

class CandidateController {
  static async getAllCandidates(req, res) {
    let candidates = []
    if (req.query.search) {
      candidates = await CandidateService.findByName(req.query.search)
    } else {
      candidates = await CandidateService.findAll()
    }
    res.render('admin/candidates', { candidates })
  }

  static async getCandidateInfo(req, res) {
    let c_id = req.params.candidate_id
    try {
      let candidate = await CandidateService.findById(c_id)
      if (candidate) {
        let results = await ResultService.findAll({candidate: c_id})
        res.render('admin/candidate-info', candidate, results)
      } else {
        throw Error('Invalid Candidate')
      }
    } catch (error) {
      console.log(error) 
      req.flash('error_msg', 'Error getting candidate\'s info')
      res.redirect('/candidates')
    }
  }

  static async createCandidatePage(req, res) {
    res.render('admin/candidates-new', {candidate: {}})
  }

  static async createCandidate(req, res) {
    let dao = req.body
    dao.fullname = dao.first_name + ' ' + dao.surname
    try {
      if (dao.password !== dao.retype_password && dao.password.trim().length > 0) {
        return res.render('admin/candidates-new', {candidate: req.body, error_msg: 'Passwords do not match'})
      }
      let conflictingCandidate = await CandidateService.findByUsername(dao.username)
      if ( conflictingCandidate != null ) {
        return res.render('admin/candidates-new', {candidate: req.body, error_msg: 'The username is already taken'})
      }
      await CandidateService.save(dao)
      req.flash('success_msg', 'Candidate saved')
      res.redirect('/candidates/new')
    } catch (error) {
      console.dir(error)
      return res.render('admin/candidates-new', {candidate: req.body, error_msg: 'Error saving candidate'})
    }
  }

  static async removeCandidate(req, res) {
    await CandidateService.removeOne(req.params.candidate_id)
    req.flash('success_msg', 'Candidate removed')
    res.redirect('/candidates')
  }
}

module.exports = CandidateController