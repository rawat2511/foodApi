import navBarFunction from "./navbar.js";

var navbar = navBarFunction();
var nav = document.getElementsByClassName("navigation")[0];
var btn = document.getElementById("submit");
var receipe = document.getElementById("receipe");
var dishes = document.getElementById("dishes");
nav.innerHTML = navbar;

function createCard( mealData ){
    console.log( mealData );

    var cuisine = mealData.strArea;
    console.log( cuisine );

    var category = mealData.strCategory;
    console.log( category );

    var image = mealData.strMealThumb;

    var receipe = mealData.strInstructions;
    console.log( receipe );

    for( var i = 1; i <= 20; i++ ){
        if( mealData[`strIngredient${i}`] )
            console.log( mealData[`strIngredient${i}`], mealData[`strMeasure${i}`] );
    }

    var mealName = mealData.strMeal;
    console.log( mealName );

    var div = document.createElement( 'div' );
    var h1 = document.createElement( 'h1' );
    h1.textContent = mealName;
    div.appendChild( h1 );
    var img = document.createElement( 'img' );
    img.src = image;
    div.appendChild( img );
    var p = document.createElement( 'p' );
    p.textContent = receipe;
    div.appendChild(p);

    dishes.appendChild(div);
}

function getReceipe(){
    var value = receipe.value;
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;

    console.log( "URL+", url );


    fetch( url )
    .then( res => {
        return res.json();
    })
    .then( data => {
        var allMeals = data.meals;
        for( var i = 0; i < allMeals.length; i++ ){
            createCard( allMeals[i] );
        }
    })
    .catch( err => {
        console.log( err );
    })
}

receipe.addEventListener("input", getReceipe);

