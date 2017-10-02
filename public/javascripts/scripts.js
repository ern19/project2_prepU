// console.log("hello world")
// //When the page loads, the two right panes should be blank
// const recipeText = $(".recipe")

// const servingNumber = $(".servingNumber")

// recipeText.hide()

// servingNumber.hide()
//When you click "View Ingredients" under the recipe,
$( ".viewIngredients" ).click(function() {
    console.log(this)
    const recipeIndex = $( this ).data("recipe")
    console.log(recipeIndex)
    $( ".recipe" ).css("display", "none")
    $(`.recipe#${recipeIndex}`).css("display", "block")
        
    // servingNumber.show()
 });

//  $( ".viewIngredients" ).click(function() {

//  })
//the ingredients and servings for that recipe appears in the center
//and right panes
