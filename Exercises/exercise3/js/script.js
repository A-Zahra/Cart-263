"use strict";

/********************************************************************

Title of Project
Zahra Ahmadi

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let buttons; // Stores five random animal names
const NUM_OPTIONS = 5; // Number of random animals being displayed on screen
let $correctButton; // Button which was just said
let numCorrectAnswer=0;
// All animals names
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

function setup() {
  // On click, runs the game
  $(document).one('click', newRound);
  
  // Speech recognition code which gives user the opportunity to orally interact with the website
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I give up': giveUp, // If user said "I give up", prompts giveUp function
      'Say it again': repeatReversedWord, // If user said "Say it again", repeats the reversed word
      'I think it is *text': oralAnswer 
    };
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
    
    // Activates debug mode for detailed logging in the console
    // annyang.debug();
  }
}

// Creates buttons, assigns css properties to
function addButton(label) {
  let $button = $('<div></div>').addClass("guess").text(label);
  $button.button();
  $button.css({
    "position": "relative",
    "margin": "auto",
    "width": "auto",
    "height": "auto",
  });
  // On click, prompts handleGuess function
  $button.on('click', handleGuess);
  return $button;
}

// Gets random animal names from the array
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

// Defines a main container div + assigns properties to 
function newRound() {
  let mainContainer = $('<div></div>').attr('id', 'mainContainer');
  mainContainer.appendTo('body');
  
  correctAnswerCounter();
  
  buttons = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    // Assigns five random animal names to buttons array
    let $button = addButton(getRandomElement(animals));
    buttons.push($button);
    // Appends buttons content to main container
    buttons[i].appendTo(mainContainer);
  }
  // Takes a random animal name from buttons array and assigns it to correctButton variable
  $correctButton = getRandomElement(buttons);
  // Sends it through the sayBackwards function
  sayBackwards($correctButton.text());

}

// Displays and Counts number of correct answers
function correctAnswerCounter () {
  let correctAnswer = $('#correctAnswer');
  correctAnswer.text(`Number of correct answers:${numCorrectAnswer}`);
}

// On click, if the value of button clicked was same as the value of correctbutton..
function handleGuess() {
  if ($(this).text() === $correctButton.text()) {
    // Removes all the divs named "guess"
    $(".guess").remove();
    // Makes a new round of buttons
    setTimeout(newRound, 100);
    numCorrectAnswer++;

  } else {
    // Otherwise, applies shake effect to the button
    $(this).effect('shake');
    // Repeats the word backward
    sayBackwards($correctButton.text());
    numCorrectAnswer = 0;
  }
}

// In new round say the value of correctButton backward
function sayBackwards(text) {
  // Reverses the word
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: Math.random(),
    pitch: Math.random()
  };
  // Says it
  responsiveVoice.speak(backwardsText, "UK English Male", options);
}

// If giveUp function got called:
function giveUp() {
  // Changes correctButton background and text color
  $correctButton.css({
    "background-color": "green",
    "color": "white"
  });
}

// If repeatReversedWord got called say the word again
function repeatReversedWord() {
  sayBackwards($correctButton.text());
}

// 
function oralAnswer(myString) {
  if ( myString === $correctButton.text()) {
    // Changes correctButton background and text color
    $correctButton.css({
      "background-color": "green",
      "color": "white"
    });
  }
  else {
      // Otherwise, applies shake effect to the button
      $(this).effect('shake');
      // Repeats the word backward
      sayBackwards($correctButton.text());
      numCorrectAnswer = 0;
    
  }
}