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
 //new users
router.get("/new", (request, response) => {
  response.render("users/new")
})

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


module.exports = router;
