const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js")
const RecipeModel = Schema.RecipeModel

router.get("/", (request, response) => {
    RecipeModel.find({})
        .then((recipes) => {
            response.render("recipes/index", {
                recipes: recipes
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router