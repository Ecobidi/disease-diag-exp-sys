let express = require('express')
require('dotenv').config()
let expressSession = require('express-session')
let connectFlash = require('connect-flash')
// let mongoose = require('mongoose')
let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

// routes
const routes = require('./routes')

// connect to mongodb database
// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())
// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
}))
app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.admin || { username: 'test' }
  app.locals.appname = APPNAME
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes
app.use('/', routes)

app.listen(process.env.PORT, () => { console.log(`${APPNAME} running on port ${process.env.PORT}`) })