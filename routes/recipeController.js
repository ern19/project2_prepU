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

router.post("/", (request, response) => {
    const newRecipe = request.body
    RecipeModel.create(newRecipe)
        .then(() => {
            response.redirect("/recipes")
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get("/:recipeId/edit", (request, response) => {
    const recipeId = request.params.recipeId

    RecipeModel.findById(recipeId)
        .then((recipe) => {
            response.render("recipes/edit", {
                recipe: recipe
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get("/:recipeId", (request, response) => {
    const recipeId = request.params.recipeId

    RecipeModel.findById(recipeId)
        .then((recipe) => {
            response.render("recipes/show", {
                recipe: recipe
            })
        })
        .catch((error) => {
            console.log(error)
        })
})
module.exports = router