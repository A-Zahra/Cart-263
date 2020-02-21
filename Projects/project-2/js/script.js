"use strict";

/*****************

Guess who i am card game
Zahra Ahmadi



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
"lion",
"donkey",
"goat",
"fish",
"monkey",
"mouse",
"panda",
"pig",
"rabbit",
"raccoon",
"rhinoceros",
"seal",
"sheep",

"snake",
"squirrel",
"tiger",
"turtle",
"whale",
"wolf",
"zebra"
Reference:

ResponsiveVoice
https://responsivevoice.org/

Animal names from:

******************/

// An array of animal names that we use to create our guessing game
let animals = [
  "dog",
  "deer",
  "gorilla",
  "frog",
  "sloth",
  "bear",
  "jaguar",
  "parrot"
];
let questionList = [
  "I am playful and do not share my lovely bone with anyone!",
  "I have big antlers and a fluffy tail! I live both in north and south America!",
  "I love banana! I am black and have large jaw muscles plus strong teeth!",
  "I live on wetLands and rivers. Flies are my favorite food!",
  "I am sooo Slow and love hanging trees!",
  "I love honey and fish! I have rounded ears and big claws!",
  "I am a wild cat that his fur is marked with rosettes!",
  "I like to repeat people words and I have colorful wings!"
];
let correctAnswer;
let selfDefinition;
let whoAmI;
let cardImg;
let cardNum = 0;
let numPointBars = 1;
let pointBarTopMargin = 0;
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
  cardInfo();
  cardImg.css({"display":"none"});


}

function getRandomElement(animal){
  let cardNumber;
  let element = animal[Math.floor(Math.random() * animal.length)];
  console.log("element "+ element);
  for (let i = 0; i < animal.length; i++){
    if (element === animal[i]){
     cardNumber = i;
      break;
    }
  }
  // console.log("cardnumber: " + cardNumber);
  return cardNumber;
}

function cardInfo() {
  whoAmI = $('<p></p>').attr('id', 'whoAmI').text("WHO AM I?");
  whoAmI.appendTo(".innerCollection");
  whoAmI.fadeIn(1000);
  whoAmI.css({"display":"table"}).after($("#selfDefinition"));
  questions();
    pointCounter();
}

function questions() {
  if (animals.length !== 0){
      cardNum  = getRandomElement(animals);
  }
  else if (animals.length < 0){
    cardNum = undefined;
    console.log("finished!");
  }
  // let r = Math.floor(Math.random(0,1)*10);
  // console.log(r);
  selfDefinition = $("#selfDefinition");
  let definition = questionList[cardNum];
  selfDefinition.text(definition);
  selfDefinition.fadeIn(1000);
  selfDefinition.css({"display":"table"});
  correctAnswer = animals[cardNum];
  // selfDefinition.bind('click', showMe);
}

function showMe(myString){
  if (myString === animals[cardNum]) {
    cardImg = $('img').addClass(animals[cardNum]);
    console.log("animal name: "+animals[cardNum]);
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
        "left": "0",
        "float":"left"
    });

    cardImg.fadeIn(500);
    selfDefinition.css({"display":"none"});
    whoAmI.css({"display":"none"});
    // }
    questionList = jQuery.grep(questionList, function(value) {
    return value != questionList[cardNum];
    });
    console.log(questionList);
    animals = jQuery.grep(animals, function(value) {
    return value != animals[cardNum];
    });
    numPointBars++;
    pointBarTopMargin += 1;
  }

  console.log(animals);

    // console.log("worked");
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

    // trueAnswer.appendTo(".column1");

}

function pointCounter() {
  let counter = $('<div></div>').attr('id', 'counter');

  console.log();
  let pointBars = [];
  for (let i = 0; i < numPointBars ; i++) {
    counter.css({
      "margin-top": `${pointBarTopMargin}vw`,
      "opacity": `${numPointBars/10}`
    });
    pointBars.push(counter);
    pointBars[i].appendTo("#pointCounter");

    console.log("worked");

  }
}
