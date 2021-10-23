//packages and setting
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

//handlebars and view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//routing section
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const restaurant = restaurantList.results.find(item => item.id.toString() === id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(item => {
    return item.name.toLowerCase().includes(keyword) || item.name_en.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants, keyword: req.query.keyword.trim() })
})

//start express server
app.listen(port, () => {
  console.log(`Restaurant List is running on http://localhost:${port}`)
})