
// //When the page loads, the two right panes should be blank

//When you click "View Ingredients" under the recipe,
$( ".viewIngredients" ).click(function() {
    console.log(this)
    const recipeIndex = $( this ).data("recipe")
    // console.log(recipeIndex)
    $( ".recipe" ).css("display", "none")
    $(`.recipe#${recipeIndex}`).css("display", "block")
    // console.log($(`.recipe#${recipeIndex}`))
  
 });

 $( ".viewIngredients" ).click(function() {
    const recipeIndex = $( this ).data("recipe")
    $(".servings").css("display", "none")
    $(`#${recipeIndex}.servings`).css("display", "block")
    console.log($(`#${recipeIndex}.servings`))
 })
//the ingredients and servings for that recipe appears in the center
//and right panes
