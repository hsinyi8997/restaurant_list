//packages and setting
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const methodOverride = require('method-override')
const restaurantList = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const app = express()
const port = 3000

//mongodb connection
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//handlebars and view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(methodOverride('_method'))

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

//routing section










//start express server
app.listen(port, () => {
  console.log(`Restaurant List is running on http://localhost:${port}`)
})