const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')
const regExpId = new RegExp(/^[a-f\d]{24}$/i)

router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  if (regExpId.test(_id)) {
    return restaurantList.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('show', { restaurant }))
      .catch(error => console.log(error))
  } else res.send(data)
})

router.put('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, description } = req.body
  const rating = Number(req.body.rating)
  if (isNaN(rating)) {
    res.send('Please go back to previous page and type number from 0-5 within rating box to create new restaurant.')
  } else {
    return restaurantList.create({
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description,
      userId
    })
      .then(() => { res.redirect('/') })
      .catch(error => console.log(error))
  }
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  if (regExpId.test(_id)) {
    return restaurantList.findOne({ _id, userId })
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  } else res.send(data)

})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  if (regExpId.test(_id)) {
    return restaurantList.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
  } else res.send(data)
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  if (regExpId.test(_id)) {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return restaurantList.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
  } else res.send(data)
})

module.exports = router