const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('../.././restaurant.json')
const restaurants = restaurantData.results

db.once('open', () => {
  Restaurant.insertMany(restaurants)
  console.log('done')
})