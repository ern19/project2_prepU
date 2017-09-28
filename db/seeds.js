require('dotenv').config();

// Database setup
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log('this is out error')
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var IngredientModel = Schema.IngredientModel;
var UserModel = Schema.UserModel;
var RecipeModel = Schema.RecipeModel;

// Delete all Companies from the database
UserModel.remove({}, function (err) {
    console.log(err);
});

RecipeModel.remove({}, function (err){
    console.log(err)
})

// Create some Companies and Snowboards
const aaronTrammell = new UserModel({ name: "Aaron Trammell" })

const chiliIngredients = [
    new IngredientModel({name: "canned tomatoes"}), 
    new IngredientModel({name: "ground beef"}), 
    new IngredientModel({name: "onions"}), 
    new IngredientModel({name: "peppers"}), 
    new IngredientModel({name: "beer"}), 
    new IngredientModel({name: "beans"})
]
const beansAndRiceIngredients = [
    new IngredientModel({name: "Rice"}), 
    new IngredientModel({name: "onions"}), 
    new IngredientModel({name: "veggie broth"}), 
    new IngredientModel({name: "black beans"}), 
    new IngredientModel({name: "garlic"})
]
const veggieSoupIngredients = [
    new IngredientModel({name: "celery"}), 
    new IngredientModel({name: "frozen veggie"}), 
    new IngredientModel({name: "onions"}), 
    new IngredientModel({name: "veggie or chicken broth"}), 
    new IngredientModel({name: "black beans"})
]

const chili = new RecipeModel({ name: 'Crockpot Chili', ingredients: chiliIngredients, url: "http://allrecipes.com/recipe/48449/slow-cooker-chili-ii/", servingNumber: 8, submittedBy: aaronTrammell })
const beansAndRice = new RecipeModel({ name: 'Black Beans and Rice', ingredients: beansAndRiceIngredients, url: "http://allrecipes.com/recipe/15559/black-beans-and-rice/", servingNumber: 4, submittedBy: aaronTrammell })
const veggieSoup = new RecipeModel({ name: 'Big Batch Veggie Soup', ingredients: veggieSoupIngredients, url: "http://www.marthastewart.com/318100/big-batch-vegetable-soup", servingNumber: 10, submittedBy: "Aaron Trammell" })

// Here we assign some snowboards to each company.
aaronTrammell.save()
.then(() => {
    console.log(`I'm saved!`)
})
.catch((error) => {
    console.log(error)
})

chili.save()
.then(() => {
    console.log(`chili saved!`)
})
.catch((error) => {
    console.log(error)
})

beansAndRice.save()
.then(() => {
    console.log(`beansAndRice saved!`)
})
.catch((error) => {
    console.log(error)
})

veggieSoup.save()
.then(() => {
    console.log(`veggieSoup saved!`)
})
.catch((error) => {
    console.log(error)
})


// Disconnect from database
db.close();