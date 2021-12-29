const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  return restaurantList.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  const sortItem = req.query.sort
  const sortMethod = {}
  let sortInput =''

  switch (sortItem) {
    case 'name_asc':
      sortMethod['name'] = 'asc'
      sortInput = `A > Z`
      break
    case 'name_desc':
      sortMethod['name'] = 'desc'
      sortInput = 'Z > A'
      break
    case 'rating_desc':
      sortMethod['rating'] = 'desc'
      sortInput = '評分最高'
      break
    case 'category':
      sortMethod['category'] = 'asc'
      sortInput = '類別'
      break
    case 'location':
      sortMethod['location'] = 'asc'
      sortInput = '地區'
      break
    default:
      sortMethod['_id'] = 'asc'
  }

  restaurantList.find({ userId })
    .lean()
    .sort(sortMethod)
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword, sortInput })
    })
})

module.exports = router