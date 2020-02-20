"use strict";

/*****************

Guess who i am card game
Zahra Ahmadi



Reference:

ResponsiveVoice
https://responsivevoice.org/

Animal names from:

******************/

// An array of animal names that we use to create our guessing game
let animals = [
  "dog",
  "deer",
  "donkey",
  "fish",
  "fox",
  "frog",
  "giraffe",
  "goat",
  "gorilla",
  "baboon",
  "bat",
  "bear",
  "buffalo",
  "camel",
  "cat",
  "cow",
  "crocodile",
  "crow",
  "hippopotamus",
  "horse",
  "kangaroo",
  "koala",
  "leopard",
  "lion",
  "monkey",
  "mouse",
  "panda",
  "parrot",
  "pig",
  "rabbit",
  "raccoon",
  "rhinoceros",
  "seal",
  "sheep",
  "sloth",
  "snake",
  "squirrel",
  "tiger",
  "turtle",
  "whale",
  "wolf",
  "zebra"
];
let questionList = [
  "I have big white teeth and I love carrot!",
    "I have mane around my neck and I am the king of jungle!",
  "sloth",
  "snake",
  "squirrel",
  "tiger",
  "turtle",
  "whale",
  "wolf"
];
let correctAnswer;
let selfDefinition;
let whoAmI;
let cardImg;
let cardNum = 0;
// Get setup!
$(document).ready(setup);

// setup()
//
// 
function setup() {
  $(".column1").one('click', cardInfo);
  
  // Speech recognition code which gives user the opportunity to orally interact with the website
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I am a *text': showMe, // If user said "I give up", prompts giveUp function
      'next': nextCard
    };
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
    // Activates debug mode for detailed logging in the console
    // annyang.debug();
  }
  
}

function nextCard() {
  cardNum++;
  cardInfo();
  cardImg.css({"display":"none"});
  
}

function cardInfo() {
  whoAmI = $('<p></p>').attr('id', 'whoAmI').text("WHO AM I?");
  whoAmI.appendTo(".innerCollection");
  whoAmI.fadeIn(1000);
  whoAmI.css({"display":"table"}).after($("#selfDefinition"));
  questions();
}

function questions() {
  let r = Math.floor(Math.random(0,1)*10);
  console.log(r);
  selfDefinition = $("#selfDefinition");
  let definition = questionList[cardNum];
  selfDefinition.text(definition);
  selfDefinition.fadeIn(1000);
  selfDefinition.css({"display":"table"});
  correctAnswer = animals[cardNum];

  
  // selfDefinition.bind('click', showMe);
}

function showMe(){
  console.log("worked");
  // if (answer === "dog") {
    // let trueAnswer = $('<div></div>').attr('id', 'trueAnswer').text("Yes the answer is " + animals[0]);
    // trueAnswer.css({
    //   "font-family":"sans-serif",
    //   "font-size":"2vw",
    //   "display":"table",
    //   "width": "50%",
    //   "position": "relative",
    //   "margin": "auto",
    //   "text-align": "center",
    //   "display": "table"
    // });
    
    cardImg = $('img').addClass(animals[cardNum]);
    console.log(animals[cardNum]);
    $(`.${animals[cardNum]}`).attr('src', 'assets/images/' + animals[cardNum] + ".png");
    cardImg.css({
        "display":"none",  
        "width": "100%",
        "height":"100%",
        "position": "relative",
        "margin": "auto",
        "top": "0",
        "bottom": "0",
        "right": "0",
        "left": "0"
    });
    // trueAnswer.appendTo(".column1");
    cardImg.fadeIn(500);
    selfDefinition.css({"display":"none"});
    whoAmI.css({"display":"none"});
  // }


}
