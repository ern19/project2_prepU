const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js")
const RecipeModel = Schema.RecipeModel
const IngredientModel = Schema.RecipeModel

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

//new route
router.get('/new', (request, response) => {
    // RENDER an empty form for the new recipe
    response.render('recipes/new')
})

//create route
router.post("/", (request, response) => {
    const newRecipe = request.body
    // console.log(newRecipe)
    const ingredients = newRecipe.ingredients.map(ingredient =>{
        return new IngredientModel({name: ingredient})
    })
    
    newRecipe.ingredients = ingredients
    
    RecipeModel.create(newRecipe)
        .then(() => {
            response.redirect("/recipes")
        })
        .catch((error) => {
            console.log(error)
        })
})

//edit route
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
//show route
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

router.put("/:recipeId", (request, response) => {
    const recipeId = request.params.recipeId

    const updatedRecipe = request.body

    
    const ingredients = updatedRecipe.name.map(ingredient =>{
        return new IngredientModel({name: ingredient})
    })
    
    updatedRecipe.ingredients = ingredients
    console.log(ingredients)
   
        // Yes, it's a valid ObjectId, proceed with `findById` call.
      
        RecipeModel.findByIdAndUpdate(recipeId)
            .then(() => {
                response.redirect("/recipes/recipeId")
            })
            .catch((error) => {
                console.log(error)
            })

})

router.get("/:recipeId/delete", (request, response) => {
    const recipeId = request.params.recipeId

    RecipeModel.findByIdAndRemove(recipeId)
        .then(() => {
            response.redirect("/recipes")
        })
        .catch((error) => {
            console.log(error)
        })
})
module.exports = router