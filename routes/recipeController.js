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
    console.log(newRecipe)
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
    //grabs recipeId from url
    const updatedRecipe = request.body
    console.log(updatedRecipe)
    
    // grabs form content
   
    const ingredients = updatedRecipe.ingredients.map(ingredient =>{
        return new IngredientModel({name: ingredient})
            // console.log(ingredients)
    })
    // returns the form inputs in the format of the IngredientModel. I think.
    updatedRecipe.ingredients = ingredients //assigns the result of the above function to the now updated recipe
    console.log(updatedRecipe.ingredients)
    
   
        // Yes, it's a valid ObjectId, proceed with `findById` call.
      
        RecipeModel.findByIdAndUpdate(recipeId, updatedRecipe, { new: true })
            .then(() => {
                response.redirect("/recipes")
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