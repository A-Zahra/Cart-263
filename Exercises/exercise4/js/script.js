"use strict";

/********************************************************************

Condiments Cacophony
Zahra Ahmadi

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let condimentSimileSentence;
let gameStarted= false;
$(document).ready(setup);

// setup()
//
// Prompts all the required functons to run the code
function setup() {
  let introduction = $('<h2></h2>').text("Let's see what monsters eat as their daily meal!").attr('id', 'introduction').appendTo('body');
  let monsterImg = $('<img>').addClass("monsterImg").attr('src', 'assets/images/lovelyMonster.png').appendTo('body');
  if (gameStarted) {
    $.getJSON("data/data.json")
      .done(dataLoaded) // If there is no error, runs dataLoaded function
      .fail(dataError); // otherwise, runs the dataError function
  }
}

// dataLoaded()
//
// Loads written code respectively
function dataLoaded(data) {
  console.log(data);

  // Gets random condiment from JSON file
  let randomCondiment = getRandomElement(data.condiments);
  // console.error(randomCondiment);

  // If subject is singular, Default verb would be "is"
  let verb = "is";
  // If the subject is plural, verb would be "are"
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are";
  }

  // Gets random cat name from JSON file
  let randomCats = getRandomElement(data.cats);
  // console.error(randomCats);

  // Makes an array of vowels
  let vowels = ["A", "E", "O", "U", "I"];
  // If the cat name first character is consonant..
  let catArticle = "a";
  // If it is vowel...
  let catFirstCharacter = randomCats.charAt(0).toUpperCase();
  for (let i = 0; i < vowels.length; i++) {
    if (catFirstCharacter === vowels[i]) {
      catArticle = "an";
    }
  }

  // Gets random room's name from JSON file
  let randomRoom = getRandomElement(data.rooms);
  // console.error(randomRoom);

  // If the room's name first character is consonant...
  let roomArticle = "a";
  // else...
  for (let i = 0; i < vowels.length; i++) {
    let roomFirstCharacter = randomRoom.charAt(0).toUpperCase();
    if (roomFirstCharacter === vowels[i]) {
      roomArticle = "an";
    }
  }

  //Gets random object's name from JSON file
  let randomObject = getRandomElement(data.objects);
  // Gets random appliance's name from JSON file
  let randomAppliances = getRandomElement(data.appliances);
  
  // Creates a container div
  let container = $('<div></div>').attr('id', 'container');
  container.appendTo('body');
  // Asigns Condiment Simile to a variable
  let condimentSimile = `${randomCondiment} ${verb} like ${catArticle} ${randomCats} in ${roomArticle} ${randomRoom} that when you add it to your ${randomAppliances} it tastes like a ${randomObject}`;
  condimentSimileSentence = $('<p></p>').text(`${condimentSimile}`).attr('id', 'condimentSimile');
  // Append it to the container div
  condimentSimileSentence.appendTo('#container');
  // On click, prompts replaceSentence
  $('#container').on("click", onClick);
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
  $(this).remove();
  setup();
}