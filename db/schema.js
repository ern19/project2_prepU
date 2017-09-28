const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: [IngredientSchema],

    url: {
        type: String,
        required: true
    },
    servingNumber: {
        type: Number,
        required: true
    },
    submittedBy: String
});





// Create models for each schema
const UserModel = mongoose.model('User', UserSchema)
const RecipeModel = mongoose.model('Recipe', RecipeSchema)
const IngredientModel = mongoose.model("Ingredient", IngredientSchema)
// Export each model so they can be required elsewhere
module.exports = {
    UserModel: UserModel,
    RecipeModel: RecipeModel,
    IngredientModel: IngredientModel
}
