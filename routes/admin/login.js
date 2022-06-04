const router = require('express').Router()
const UserService = require('../../services/user')

router.get('/', async (req, res) => {
  res.render('admin/login')
})

router.post('/', async (req,res) => {
  let dao = req.body
  let user = await UserService.findByUsername(dao.username)
  if (user && user.password == dao.password) {
    req.session.admin = user
    res.redirect('/dashboard')
  } else {
    req.flash('error_msg', 'Bad Login Credentials')
    res.redirect('/login')
  }
})

module.exports = router