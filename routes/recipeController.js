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

router.get('/new', (request, response) => {
    // RENDER an empty form for the new recipe
    response.render('recipes/new')
})
module.exports = router