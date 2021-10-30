const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('../.././restaurant.json')
const restaurants = restaurantData.results
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.insertMany(restaurants)
  console.log('done')
})