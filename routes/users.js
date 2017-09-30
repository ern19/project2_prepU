var express = require('express');
var router = express.Router();

const Schema = require("../db/schema.js")
const UserModel = Schema.UserModel
/*users Index */
router.get('/', function(req, res, next) {
  UserModel.find({})
    .then((users) => {
      res.render('users/index', {
        users: users
      })
    })
    .catch((error) => {
      console.log(error)
    })
});
 //render new user form
router.get("/new", (request, response) => {
  response.render("users/new")
})

//create new user
router.post("/", (request, response) => {
  const newUser = request.body

  UserModel.create(newUser)
    .then(() => {
      response.redirect("/")
    })
    .catch((error) => {
      console.log(error)
    })
})
//edit route
router.get("/:userId/edit", (request, response) => {
  const userId = request.params.userId
  
  UserModel.findById(userId)
    .then((user) => {
      response.render("users/edit", {
        user: user
      })
    })
    // console.log(userId)
    // .catch((error) => {
    //   console.log(error)
    // })
})

router.put("/:userId", (request, response) => {
  const userId = request.params.userId

  const updatedId = request.body

  UserModel.findByIdAndUpdate(userId, updatedId, {new: true})
    .then(() => {
      response.redirect(`/users/${userId}`)
    })
})
//show single user
router.get("/:userId", (request, response) => {
  const userId = request.params.userId
  UserModel.findById(userId)
    
    .then((user) => {
      response.render("users/show", {
        user: user
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

//delete user
router.get("/:userId/delete", (request, response) => {
  const userId = request.params.userId
  UserModel.findByIdAndRemove(userId)
    .then(() => {
      response.redirect("/users")
    })
})

module.exports = router;
