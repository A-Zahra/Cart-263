"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let buttons; 
const NUM_OPTIONS = 5;
let $correctButton;
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
let answer = 0;
function setup() {
  $(document).one('click', newRound);
  
      
    if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I give up': giveUp,
      'Say it again': repeatReversedWord,
      'I think it is ()': oralAnswer
    };
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
}
function addButton(label){
  let $button = $('<div></div>').addClass("guess").text(label);
  $button.button();
  $button.css({
    "position": "relative",
    "margin": "auto",
    "width": "auto",
    "height":"auto",
  });
  $button.on('click', handleGuess);
  return $button;
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

function newRound() { 
  let mainContainer = $('<div></div>').addClass("mainContainer");
  mainContainer.appendTo('body');
  mainContainer.css({
    "width": "50%",
    "height":"10%",
    "background-color": "yellow",
    "display": "inline-flex",
    "position": "absolute",
    "margin": "auto",
    "margin-top": "5vw",
    "top": "0",
    "right": "0",
    "bottom": "0",
    "left": "0",
    "padding": "3vw"
  });
  
  buttons = [];
  for(let i = 0; i < NUM_OPTIONS; i++){
    let $button = addButton(getRandomElement(animals));
    buttons.push($button);
    buttons[i].appendTo(mainContainer);
  }

  $correctButton = getRandomElement(buttons);
  sayBackwards($correctButton.text());

}

function handleGuess() {
  if ($(this).text() === $correctButton.text()) {
    $(".guess").remove();
    setTimeout(newRound, 100);
  }
  else {
    $(this).effect('shake');
    sayBackwards($correctButton.text());
  }
}

function sayBackwards(text){
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: Math.random(),
    pitch: Math.random()
  };
  responsiveVoice.speak(backwardsText, "UK English Male", options);
}

function giveUp(){
    $correctButton.css({
      "background-color": "green",
      "color":"white"
    });
}

function repeatReversedWord() {
    sayBackwards($correctButton.text());
}

function oralAnswer() {
  if (answer === $correctButton.text() ) {
    $('body').css({
      "background-color" : "orange"
    })
  }
}