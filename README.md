# Restaurant List
A web server which provides restaurants information for users that can create their own account to add, edit and so on.

## ScreenShots
### Login view
![Login page screenshot](https://github.com/hsinyi8997/restaurant_list/blob/main/public/image/login_page.jpg)

### User's index view
![Index page screenshot](https://github.com/hsinyi8997/restaurant_list/blob/main/public/image/index_page.jpg)

## Feature
* User can create its own account
* User can create account via facebook account
* User can view all restaurants in list
* User can click on the restaurant to see more information
* User can search specific restaurant by typing keyword
* User can create a new restaurant
* User can edit information of restaurant
* User can delete restaurant
* User can sort restaurant list in different ways

## Prerequisites
* Node.js (v14.16.0)
* Express
* Express-handlebars
* MongoDB
* Passport

## Installation
1. Open terminal and clone the repo to local
```
git clone https://github.com/hsinyi8997/restaurant_list.git
```
2. Move to repo file
```
cd restaurant_list
```
3. Start dependencies installation
```
npm install
```
4. Add seed to the project
```
npm run seed
```

## Execution
1. Start Express server in Node.js
```
npm run start
```
or

2. Start Express server in dev mode (By Nodemon)
```
npm run dev
```
