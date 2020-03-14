"use strict";

/********************************************************************

Condiments Cacophony
Zahra Ahmadi

I have an introduction page to tell the user what they should expect to see, and a main page
which shows random description made out of random words. If the player clicks on the page a 
new description is generated and is replaced by the previous one

Reference
Monster image:
https://www.pngarts.com/explore/136165
*********************************************************************/
let condimentSimile; // holds description
let condimentSimileSentence; // holds description variable
let randomCondiment; // Stores random condiments
let randomAppliances; // Stores random Appliances
let randomCats; // Stores random cat names
let randomRoom; // Stores random room names
let randomObject; // Stores random objects
let catArticle; // Stores the correct Article that should be used for cat name
let roomArticle; // Stores the correct Article that should be used for room name
let objectArticle; // Stores the correct Article that should be used for object name
let firstChar = 0; // Be used in charAt() method
let roomFirstCharacter; // Stores room's name first character
let catFirstCharacter; // Stores cat's name first character
let objectFirstCharacter; // Stores object's name first character
let vowels; // Stores vowels
let verb; // Stores the appropriate verb
let gameStarted = true; 
let $button; // Stores button value

$(document).ready(setup);

// setup()
//
// Prompts all the required functons to run the code
function setup() {
  startScreen();
}

// startScreen()
//
// Displays introduction
function startScreen() {
  $('#startScreen').show();
  let introduction = $('#introduction').text("Yesterday I met a monster. We had a discussion about condiments. He told me he has tried all kinds of condiments that humans add to their food. When I asked him how he felt about them he told me...");
  let monsterImg = $('#monsterImg').attr('src', 'assets/images/lovelyMonster.png').after($('#button'));
  startButton();
}

// startButton()
//
// The button which prompts the gameScreen function
function startButton() {
  $button = $('#button').text("See!");
  $button.button();
  if (gameStarted){
    // On click, prompts startGame function
    $button.one('click', gameScreen);
  }
}

// gameScreen()
//
// The main screen which displays the description
function gameScreen() {
  gameStarted = false;
  $('#startScreen').hide();
  $.getJSON("data/data.json")
    .done(dataLoaded) // If there is no error, runs dataLoaded function
    .fail(dataError); // otherwise, runs the dataError function
}

// getData
//
// Gets data from JSON file
function getData(data) {
  // Gets random condiment from JSON file
  randomCondiment = getRandomElement(data.condiments);

  // If subject is singular, Default verb would be "is"
  verb = "is";
  // If the subject is plural, verb would be "are"
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are";
  }

  // Gets random cat name from JSON file
  randomCats = getRandomElement(data.cats);
  // Gets random room's name from JSON file
  randomRoom = getRandomElement(data.rooms);
  //Gets random object's name from JSON file
  randomObject = getRandomElement(data.objects);
  // Gets random appliance's name from JSON file
  randomAppliances = getRandomElement(data.appliances);
  
  // Makes an array of vowels
  vowels = ["A", "E", "O", "U", "I"];
  // If the cat name first character is consonant..
  catArticle = "a";
  // If the room's name first character is consonant...
  roomArticle = "a";
  // If the room's name first character is consonant...
  objectArticle = "a";
  
  // If it is vowel...
  catFirstCharacter = randomCats.charAt(firstChar).toUpperCase();
  roomFirstCharacter = randomRoom.charAt(firstChar).toUpperCase();
  objectFirstCharacter = randomObject.charAt(firstChar).toUpperCase();
  for (let i = 0; i < vowels.length; i++) {
    if (catFirstCharacter === vowels[i]) {
      catArticle = "an";
    }
    if (roomFirstCharacter === vowels[i]) {
      roomArticle = "an";
    }
    if (objectFirstCharacter === vowels[i]) {
      objectArticle = "an";
    }
  }
}

// dataLoaded()
//
// Loads written code respectively
function dataLoaded(data) {
  console.log(data);
  getData(data);
  
  // Creates a container div
  let container = $('<div></div>').attr('id', 'container');
  container.appendTo('body');
  // Asigns Condiment Simile to a variable
  condimentSimile = ` I think ${randomCondiment} ${verb} like ${catArticle} ${randomCats} that when you add it to your ${randomAppliances} in ${roomArticle} ${randomRoom}, it tastes like ${objectArticle} ${randomObject}`;
  condimentSimileSentence = $('<p></p>').text(`${condimentSimile}`).attr('id', 'description');
  // Append it to the container div
  condimentSimileSentence.appendTo('#container');
  // On click, prompts replaceSentence
  let andButton = $('<div></div>').text("and...").attr('id', 'andButton').appendTo('#container');
  andButton.button();
  andButton.on("click", onClick);
}

// dataError
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}

// getRandomElement
//
// Gets random data from JSON file
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

// replaceSentence
//
// Remove previous sentence and runs the setup function again
function onClick() {
  $('#container').remove();
  gameScreen();
}