"use strict";

/********************************************************************

Slamina Special
Zahra Ahmadi

There are five buttons at the middle of screen with labels of animal names . In each round, one of the five animal names is said reversely. 
The user should recognize which of the five is the correct answer and show his/her true recognition by clicking on the button or
saying that orally. The word is checked through the written functions. If the answer is correct it becomes green, 
1 is added to the counter value and it goes to next round. Otherwise, the word is said again, the wrong button shakes 
and after a second is removed from the screen. The counter is set to zero as well. The user can give up or asks the word is said again.

*********************************************************************/

$(document).ready(setup);

let buttons; // Stores five random animal names
const NUM_OPTIONS = 5; // Number of random animals being displayed on screen
let $correctButton; // Button which was just said
let counterValue = 0; // Value which is stored in numCorrectAnswers
let wrongAnswer; // Holds wrong answer
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

// setup()
//
// Sets up everything
function setup() {
  // On click, runs the game
  $(document).one('click', newRound);

  // Speech recognition code which gives user the opportunity to orally interact with the website
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I give up': giveUp, // If user said "I give up", prompts giveUp function
      'Say it again': repeatReversedWord, // If user said "Say it again", repeats the reversed word
      'I think it is *text': oralAnswer // Takes user oral answer and checks it through oralAnswer function
    };
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
    // Activates debug mode for detailed logging in the console
    // annyang.debug();
  }
}

// addButton()
//
// Creates buttons, assigns css properties to
function addButton(label) {
  let $button = $('<div></div>').addClass("guess").attr('id', label).text(label);
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

// getRandomElement()
//
// Gets random animal names from the array
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

// newRound()
//
// Defines a main container div + assigns properties to 
function newRound() {
  let mainContainer = $('<div></div>').attr('id', 'mainContainer');
  mainContainer.appendTo('body');

  // Counts number of correct answers
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

// correctAnswerCounter()
//
// Displays and Counts number of correct answers
function correctAnswerCounter() {
  let numCorrectAnswer = counterValue;
  let correctAnswer = $('#correctAnswer');
  correctAnswer.css({
    "display": "inline-flex"
  });
  console.log("numCorrectAnswer" + numCorrectAnswer);
  correctAnswer.text(`NUMBER OF CORRECT ANSWERS:${numCorrectAnswer}`);
}

// handleGuess()
//
// On click, if the value of button clicked was same as the value of correctbutton..
function handleGuess() {
  if ($(this).text() === $correctButton.text()) {
    // Removes all the divs named "guess"
    $(".guess").remove();
    //If answer is correct, adds one to the value of counterValue variable
    counterValue++;
    // Makes a new round of buttons
    setTimeout(newRound, 100);
  } else {
    // Otherwise, 
    //applies shake effect to the button
    $(this).effect('shake');
    // Repeats the word backward
    sayBackwards($correctButton.text());
    // Sets counter value to zero 
    counterValue = 0;
    correctAnswerCounter();
    // Assigns button's to the wrongAnswer variable
    // After a second, removes the button
    wrongAnswer = $(this);
    setTimeout(function() {
      wrongAnswer.remove();
    }, 1000);
  }
}

// sayBackwards()
//
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

// giveUp()
//
// If giveUp function got called:
function giveUp() {
  // Changes correctButton background and text color
  $correctButton.css({
    "background-color": "green",
    "color": "white"
  });
  // Makes a new round of buttons
  setTimeout(newRound, 1000);
}

// repeatReversedWord()
//
// If repeatReversedWord got called say the word again
function repeatReversedWord() {
  sayBackwards($correctButton.text());
}

// oralAnswer
//
// Check if the answer is right or wrong
function oralAnswer(myString) {
  // If it is right,
  if (myString === $correctButton.text()) {
    // Changes correctButton background and text color
    $correctButton.css({
      "background-color": "green",
      "color": "white"
    });
    //If answer is correct, adds one to the value of counterValue variable
    counterValue++;
    // Makes a new round of buttons
    setTimeout(newRound, 1000);
  } else {
    //Otherwise,
    // Adds shake effect to the wrong button
    $(`#${myString}`).effect('shake');
    // Repeats the word backward
    sayBackwards($correctButton.text());

    // Sets counter value to zero 
    counterValue = 0;
    correctAnswerCounter();
    // Removes the wrong answer
    wrongAnswer = $(`#${myString}`);
    setTimeout(function() {
      wrongAnswer.remove();
    }, 1000);
  }
}