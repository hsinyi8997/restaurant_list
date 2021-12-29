//packages and setting
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
const methodOverride = require('method-override')
const port = 3000

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
usePassport(app)
app.use(routes)

//start express server
app.listen(port, () => {
  console.log(`Restaurant List is running on http://localhost:${port}`)
})