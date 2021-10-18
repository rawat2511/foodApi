import navBarFunction  from "./navbar.js";

var nav = document.getElementsByClassName("navigation")[0];
nav.innerHTML = navBarFunction();

var dishes = document.getElementById("dishes");

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
    window.location.href = "./latestRecipe.html";
})



function createCard( mealData ){
    mealData = mealData[0];

    var cuisine = mealData.strArea;
    console.log( cuisine );

    var category = mealData.strCategory;
    console.log( category );

    var image = mealData.strMealThumb;

    var receipe = mealData.strInstructions;
    console.log( receipe );

    
    var mealName = mealData.strMeal;
    console.log( mealName );
    
    var div = document.createElement( 'div' );
    var h1 = document.createElement( 'h1' );
    h1.textContent = mealName;
    div.appendChild( h1 );
    var img = document.createElement( 'img' );
    img.src = image;
    div.appendChild( img );

    for( var i = 1; i <= 20; i++ ){
        var ingredient;
        if( mealData[`strIngredient${i}`] ){

            ingredient = mealData[`strIngredient${i}`] + " - " + mealData[`strMeasure${i}`];
            var span = document.createElement("span");
            span.textContent = ingredient;
            div.appendChild( span );

        }
    }
    var p = document.createElement( 'p' );
    p.textContent = receipe;
    div.appendChild(p);
    
    dishes.appendChild(div);
}

function getRecipe(){
    dishes.innerHTML = "";
    var url = `https://www.themealdb.com/api/json/v1/1/random.php`;
    fetch( url )
    .then( res => {
        return res.json();
    })
    .then( data => {
        var meal = data.meals;
        createCard( meal );
    })
    .catch( err => {
        console.log( err );
    })
}

var debounce = (func, timeout = 1000*24*60*60 ) => {
    var timer;
    return (...args) => {
        if( timer )
            clearTimeout( timer );
        timer = setTimeout(() => {
            func.apply( this, args );
        }, timeout);
    }
}

window.addEventListener("load", () => {
    console.log( dishes.innerHTML === "" );
    console.log( dishes.innerHTML );
    if( dishes.innerHTML === "" ){
        getRecipe();
    }
    else{
        debounce( () => {
            getRecipe();
        }, 2000)
    }
});

