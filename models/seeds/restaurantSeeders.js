if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantData = require('../../restaurant.json')
const bcrypt = require('bcryptjs')
let restaurants = restaurantData.results

const SeedUser = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    restaurantId: [0, 1, 2]
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    restaurantId: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(Array.from(SeedUser, SeedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SeedUser.password, salt))
      .then(hash => User.create({
        name: SeedUser.name,
        email: SeedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        let restaurantList = []
        SeedUser.restaurantId.forEach(index => {
          restaurants[index].userId = userId
          restaurantList.push(restaurants[index])
        })
        return Restaurant.create(restaurantList)
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch((err) => console.log(err))
})

