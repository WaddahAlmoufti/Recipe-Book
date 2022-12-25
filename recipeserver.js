//Database to store all recipe data
//This will give you 3 recipes to start with
let database = {
	"0":{
		"ingredients":
		[
			{"name":"Crab","unit":"Tsp","amount":3},
			{"name":"Peas","unit":"Cup","amount":12},
			{"name":"Basil","unit":"Tbsp","amount":10},
			{"name":"Cumin","unit":"Liter","amount":3},
			{"name":"Salt","unit":"Tbsp","amount":1}
		],

		"name":"Boiled Crab with Peas",
		"preptime":"13",
		"cooktime":"78",
		"description":"A boring recipe using Crab and Peas",
		"id":"0"
	},
	"1":{
		"ingredients":
		[
			{"name":"Peanuts","unit":"Liter","amount":10},
			{"name":"Artichoke","unit":"Tsp","amount":3},
			{"name":"Basil","unit":"Cup","amount":11},
			{"name":"Sage","unit":"Grams","amount":13},
			{"name":"Pepper","unit":"Cup","amount":1}
		],

		"name":"Boiled Peanuts with Artichoke",
		"preptime":"73",
		"cooktime":"74",
		"description":"A exciting recipe using Peanuts and Artichoke",
		"id":"1"
	},
	"2":{
		"ingredients":
		[
			{"name":"Lobster","unit":"Tsp","amount":14},
			{"name":"Brussel Sprouts","unit":"Liter","amount":14},
			{"name":"Sage","unit":"Tbsp","amount":3},
			{"name":"Thyme","unit":"Tbsp","amount":12},
			{"name":"Pepper","unit":"Tsp","amount":10},
			{"name":"Cumin","unit":"Tbsp","amount":11}
		],

		"name":"Spicy Lobster with Brussel Sprouts",
		"preptime":"86",
		"cooktime":"19",
		"description":"A tasty recipe using Lobster and Brussel Sprouts",
		"id":"2"
	}
}

const { request, response } = require('express');
const express = require('express');
const pug = require("pug")
let app = express();
app.set("view engine", "pug");


app.use(express.static("public"));
app.use(express.json());
var count = 2


//Start adding route handlers here

app.post("/recipes", (request,response) =>{
	const newData = request.body
	count++

	database[count] = {
		...newData,
		id: String(count),
	}

	response.sendStatus(201);
	console.log(database);

})

app.get("/recipes", (request,response) =>{
	response.render("recipes", {recipes: database})
})

app.get("/recipes/:RecipeId", (request,response) =>{
	
	var recipeID = request.params.RecipeId;
	var recipe = database[recipeID];
	var ingredients = recipe.ingredients;

	
	response.render("recipe", {recipe: recipe, ingredients: ingredients})
})



app.listen(3000);
console.log("Server listening at http://localhost:3000");
