var newAnimal = $('#searchBar').val().trim();
var animalArray = [
	'dog',
	'cat',
	'bird',
	'owl',
	'spider',
	'ant',
	'lizard',
	'dragon',
	'salamander',
	'goose',
	'mole',
	'squirrel'
];

function renderGif() {
	// clear the gif div
	$('#gifDiv').empty();
	// animal in question is the button value
	var animalInQuestion = $(this).data('name');
	// console log the animal
	console.log(animalInQuestion);
	// my query url (i used the api key provided in class because mine isn't working)
	var queryURL =
		'https://api.giphy.com/v1/gifs/search?q=' +
		animalInQuestion +
		'&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10';
	// my ajax call
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(response) {
		// results variable gets into the data section of my object
		var results = response.data;
		// console log response so I can look at it
		console.log(response);
		// for loop to loop through the gifs
		for (var i = 0; i < results.length; i++) {
			// add a new div
			var newGifDiv = $('<div>');
			newGifDiv.addClass('.newPadding');
			// create an image element
			var animalImage = $('<img>');
			// create variable for still state url
			var animalStill = results[i].images.original_still.url;
			// create variable for animate state url
			var animalAnimate = results[i].images.fixed_height.url;
			// add attribute of source- animal still
			animalImage.attr('src', animalStill);
			// set data attr- still
			animalImage.attr('data-still', animalStill);
			// set data attr - animate
			animalImage.attr('data-animate', animalAnimate);
			// set data attr- state still
			animalImage.attr('data-state', 'still');
			// add classes
			animalImage.addClass('images gif rounded float-left newPadding');
			// prepend the image to the new gif div
			newGifDiv.prepend(animalImage);
			// add the rating to the div in a paragraph- make it uppercase (i changed this later to a h4 to makeitmore promient)
			var animalPara = $('<h4>').text(`${results[i].rating.toUpperCase()}`);
			animalPara.addClass('float-left newPadding');
			// prepend animalPara to the new div
			newGifDiv.append(animalPara);
			// append new gif div to the original gif div
			$('#gifDiv').prepend(newGifDiv);
		}
	});
}
// function to move gifs in and out of animated and still state
$(document).on('click', '.gif', function() {
	// setting the state of the gif to avariable
	var state = $(this).attr('data-state');

	//if state equals still
	if (state == 'still') {
		// change the attribute of 'this'(my image) to animate
		$(this).attr('src', $(this).data('animate'));
		// update data state to animate
		$(this).attr('data-state', 'animate');
		//else
	} else {
		//the state is still
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
});

function renderButtons() {
	// clear the div
	$('#buttonDiv').empty();

	// Looping through the array of animals
	for (var i = 0; i < animalArray.length; i++) {
		//create buttons for animals
		var animalButton = $('<button>');
		//slap on a class
		animalButton.addClass('animal-button btn btn-dark animated bounceIn margin');
		// Adding a data-attribute
		animalButton.attr('data-name', animalArray[i]);
		// pushes animal name to array
		animalButton.text(animalArray[i]);
		// append the buttons to the div
		$('#buttonDiv').append(animalButton);
	}
}

$('#searchButton').on('click', function() {
	// new value of an animal button
	var newAnimal = $('#searchBar').val().trim();
	// add to my array
	animalArray.push(newAnimal);
	// will make the new animal into a button
	renderButtons();
	// clear the search bar
	$('#searchBar').val('');
});
// renders gif when I click on the animal button
$(document).on('click', '.animal-button', renderGif);

// renders buttons for animals already in my array
$(document).ready(function() {
	renderButtons();
});
