var express = require('express');
var router = express.Router();

const Schema = require("../db/schema.js")
const UserModel = Schema.UserModel
/* GET users listing. */
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
