const router = require('express').Router()

const symptoms = {
  'do you have fever?': [],
  'do you have appetite loss?': [],
  'do you have nausea and vomitting?': [],
  'do you experience fatigue?': [],
  'do you pass out dark urine?': [],
  'do you feel pain in the right hand side of your abdomen?': [],
  'do you have yellowing of the skin and whiteness of the eyes (Jaundice)?': [],
  'does anyone in your family have / treated hepatitis?': [],
  'have you lived in an overcrowded environment?': [],
  'have you had unprotected sex with a suspected hepatitis person?': [],
  'what is your HBs Ag Test Result?': ['positive', 'negative'],
  'what is your liver function test (LFT) result?': ['positive', 'negative'],
  'what is your urinanalysis test result?': ['postivie', 'negative'],
  'What is your abdominal ultra scan test result': ['low', 'normal', 'high']
}

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/diagnosis', (req, res) => {
  let keys = Object.keys(symptoms)
  res.render('diagnosis-page', { symptoms, symptomsKeys: keys })
})

router.post('/diagnosis', (req, res) => {
  // console.log(req.body)
  let d = req.body
  let questions = Object.keys(d)
  let numberOfSteps = questions.length
  let score = 0
  let inc = 100 / numberOfSteps
  let test_result

  // console.log(inc)

  // console.log(questions)

  questions.forEach(q => {
    if (d[q] == 'YES' || d[q] == 'POSITIVE' || d[q] == 'HIGH') score += inc
  })

  console.log(score)

  if (score > 40 && score < 60) {
    med_text = 'You are showing mild symptoms of hepatitis, try going for a physical test'
    test_result = 'Mild Symptoms of Hepatities-B'
  } else if (score >= 60 && score < 75) {
    med_text = 'Patient should be placed on constant check'
    test_result = '50/50 Chance of Hepatitis-B Infection'
  } else if (score >= 75 && score < 80) {
    med_text = 'Patient has hepatitis B, kindly visit the nearest clinic for treatment'
    test_result = 'Acute Hepatitis-B Detected'
  } else if (score >= 80) {
    med_text = 'Patient has chronic hepatitis B, liver may be severally damaged, visit a doctor now'
    test_result = 'Chronic Hepatitis-B Confirmed'
  } else {
    med_text = 'No cause for alarm, patient does not exhibit any mild symptom of hepatitis. always perform your checkup here'
    test_result = 'No Hepatitis-B Detected'
  }

  res.render('test-result', { test_result, med_text })

})

router.get('/fact-book', (req, res) => {
  res.render('fact-book')
})


// const UserRouter = require('./admin/user')
// const LoginRouter = require('./admin/login')

// const UserModel = require('../models/user')

// const getDashboard = async (req, res) => {
//   let category_count = await CategoryModel.count({})
//   let candidate_count = await CandidateModel.count({})
//   let test_count = await TestModel.count({})
//   let result_count = await ResultModel.count({})
//   let user_count = await UserModel.count({})
//   res.render('admin/dashboard', {category_count, candidate_count, test_count, result_count, user_count})
// }

// const authMiddleware = async (req, res, next) => {
//   if (req.session.admin) next()
//   else res.redirect('/login')
// }

// router.use('/login', LoginRouter)

// router.use('/', authMiddleware)

// router.get('/', getDashboard)

// router.get('/dashboard', getDashboard)

// router.use('/users', UserRouter)

// router.use('/logout', (req, res) => {
//   req.session.admin = null
//   res.redirect('/login')
// })



module.exports = router
