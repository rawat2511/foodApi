import navBarFunction from "./navbar.js";

var nav = document.getElementsByClassName("navigation")[0];
var navbar = navBarFunction();
nav.innerHTML = navbar;

var div1 = document.getElementById('1');
var div2 = document.getElementById('2');
var div3 = document.getElementById('3');

div1.addEventListener( "click", () => {
    window.location.href = "./index.html";
});

div2.addEventListener( "click", () => {
    window.location.href = "./recipeOfTheDay.html";
})

div3.addEventListener( "click", () => {
    window.location.href = "./latest.html";
})


var btn = document.getElementById("submit");
var receipe = document.getElementById("receipe");
var dishes = document.getElementById("dishes");

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
        dishes.innerHTML = "";
        for( var i = 0; i < allMeals.length; i++ ){
            createCard( allMeals[i] );
        }
    })
    .catch( err => {
        console.log( err );
    })
}

const debounce = (func, timeout) => {
    var timer;
    return (...args) => {

        clearTimeout( timer );

        timer = setTimeout( () => {
            func.apply(this, args);
        }, timeout );

    }
}

receipe.addEventListener("input", debounce( () => {
    getReceipe();
}, 500));

