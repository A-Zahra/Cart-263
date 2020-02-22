"use strict";

/*************************************************************************************

Guess who I am - card game
Zahra Ahmadi

---------------
***Reference***
---------------
** Codes:

ResponsiveVoice
https://responsivevoice.org/

After() method:
https://api.jquery.com/after/

$.grep():
https://www.w3resource.com/jquery-exercises/part1/jquery-practical-exercise-29.php

clearInterval:
https://www.w3schools.com/jsref/met_win_clearinterval.asp
--------------------------------------------------------------------------------------
** Images:

snake
https://www.pinterest.com/pin/705094885384969057/

lion
https://pngio.com/images/png-a661337.html

donkey
https://www.hiclipart.com/free-transparent-background-png-clipart-intmn

zebra
https://www.pngwave.com/png-clip-art-zqctc

rabbit
https://www.uihere.com/free-cliparts/daisy-duck-ariel-thumper-the-walt-disney-company-character-rabbit-1616604/download

dog
https://favpng.com/png_view/transparent-lady-and-the-tramp-clipart-magic-kingdom-the-walt-disney-company-jim-dear-dog-woman-png/Z1nye6EX

deer
https://pngimage.net/bambi-png-4/

gorilla
https://www.pinterest.ca/pin/572168327650605049/?lp=true

frog
https://www.pngfind.com/mpng/mTmwJ_download-kermit-the-frog-png-transparent-png/

leopard
https://fineartamerica.com/featured/leaping-leopard-andrew-farley.html?product=poster

sloth
https://www.subpng.com/png-kapcgu/download.html

parrot
https://www.pngwave.com/png-clip-art-bdqsi

tiger
https://www.pinterest.ca/pin/372039619215909135/?lp=true

bear
https://disneyvillainroleplay.fandom.com/wiki/Mordu

wolf
https://wallpaperaccess.com/angry-wolf
-----------------------------------------------------------------------------------------
**Animal names**
https://github.com/dariusk/corpora/blob/master/data/animals/common.json

*****************************************************************************************/

// An array of animal names
// Be used for several purposes like
let animals = [
  "dog",
  "deer",
  "gorilla",
  "frog",
  "sloth",
  "bear",
  "jaguar",
  "parrot",
  "wolf",
  "rabbit",
  "snake",
  "lion",
  "donkey",
  "zebra",
  "tiger"
];
// List of self descriptions
let descriptionList = [
  "I am playful and do not share my lovely bone with anyone!",
  "I have big antlers and a fluffy tail! I live both in north and south America!",
  "I love banana! I am black and have large jaw muscles plus strong teeth!",
  "I live on wetLands and rivers. Flies are my favorite food!",
  "I am sooo Slow and love hanging trees!",
  "I love honey and fish! I have rounded ears and big claws!",
  "I am a wild cat that his fur is marked with rosettes!",
  "I like to repeat people words and I have colorful wings!",
  "I hunt sheeps and dogs are my main enemy! ",
  "I am smart and fast! carrot is my favorite food!",
  "I don't have limbs but I'm fast and crawl on the ground!",
  "I have mane around my neck and live in a group!",
  "I am stubborn! I always wanted to be like a horse but I am not!",
  "My skin is striped! I am an herbivore and moslty live in Africa!",
  "I am a large cat! I love to swim and my orange skin has vertical black stripes!"
];
let selfDefinition; // Holds self definition sentence
let whoAmI; // Holds the question
let cardImg; // Holds animal image
let cardNum = 0; // Holds index number of picked card
let numPointBars = 1; // Number of score bars is accumulated in
let pointBarTopMargin = 0; // score bars position
let numTimerBars = 30; // Holds number of time bars
let removeTimeBar = 0; // Specifies number of time bars should be removed
let timerBars = []; // Stores time bars
let maxOpacity = 255; // Maximum opacity
let myTime = 0; // Stores timer
let questionWasReplied = false; // Checks if the question was replied

// Get setup!
$(document).ready(setup);

// setup()
//
// Sets up everything
function setup() {
  // On click, prompts start game function
  $(".column1").one('click', startGame);

  // Speech recognition code which gives user the opportunity to orally interact with the website
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I am a *text': showMe, // If user said "I am a (animal name)", prompts show me function
      'next': nextCard // If he said next, prompts nextCard function
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();

    // Activates debug mode for detailed logging in the console
    // annyang.debug();
  }
}

// startGame()
//
// Runs timer + prompts cardInfo function
function startGame() {
  timer();
  myTime = setInterval(runTime, 2000);
  cardInfo();
}

// getRandomElement()
//
//
function getRandomElement(animal) {
  let cardNumber;
  let element = animal[Math.floor(Math.random() * animal.length)];
  console.log("element " + element);
  for (let i = 0; i < animal.length; i++) {
    if (element === animal[i]) {
      cardNumber = i;
      break;
    }
  }
  return cardNumber;
}

// cardInfo()
//
//
function cardInfo() {
  whoAmI = $('<p></p>').attr('id', 'whoAmI').text("WHO AM I?");
  whoAmI.appendTo(".innerCollection");
  whoAmI.fadeIn(500);
  whoAmI.css({
    "display": "table"
  }).after($("#selfDefinition"));
  descriptions();
  pointCounter();
}

// descriptions()
//
//
function descriptions() {
  if (animals.length !== 0) {
    cardNum = getRandomElement(animals);
  } else if (animals.length < 0) {
    cardNum = undefined;
  }

  selfDefinition = $("#selfDefinition");
  let definition = descriptionList[cardNum];
  selfDefinition.text(definition);
  selfDefinition.fadeIn(500);
  selfDefinition.css({
    "display": "table"
  });
  // selfDefinition.bind('click', showMe);
}

// showMe()
//
//
function showMe(myString) {
  if (myString === animals[cardNum]) {
    cardImg = $('<img>').addClass(animals[cardNum]).attr('src', 'assets/images/' + animals[cardNum] + ".png");
    console.log("animal name: " + animals[cardNum] + " card num: " + cardNum);

    cardImg.css({
      "display": "none",
      "width": "100%",
      "height": "100%",
      "position": "relative",
      "margin": "auto",
      "top": "0",
      "bottom": "0",
      "right": "0",
      "left": "0",
      "float": "left",
      "border-radius": "10px"
    });

    if (myString === "lion") {
      cardImg.css({
        "background-color": "black"
      });
    } else {
      cardImg.css({
        "background-color": "white"
      });
    }

    cardImg.fadeIn(500);
    cardImg.appendTo('.column1');
    cardImg.after($(".innerCollection"));
    selfDefinition.css({
      "display": "none"
    });
    whoAmI.css({
      "display": "none"
    });

    setTimeout(function() {
      descriptionList = jQuery.grep(descriptionList, function(value) {
        return value != descriptionList[cardNum];
      });
      console.log(descriptionList);
      animals = jQuery.grep(animals, function(value) {
        return value != animals[cardNum];
      });
    }, 500);

    numPointBars++;
    pointBarTopMargin += 1;
  }
  questionWasReplied = true;
  console.log(animals);
}

// nextCard()
//
//
function nextCard() {
  if (questionWasReplied) {
    cardInfo();
    cardImg.remove();
    questionWasReplied = false;
  }
}

// pointCounter()
//
//
function pointCounter() {
  let counter = $('<div></div>').attr('id', 'counter');

  let pointBars = [];
  for (let i = 0; i < numPointBars; i++) {
    counter.css({
      "margin-top": `${pointBarTopMargin}vw`,
      "opacity": `${numPointBars/10}`
    });
    pointBars.push(counter);
    pointBars[i].appendTo("#pointCounter");
  }
}

// timer()
//
//
function timer() {

  let timerBarTopMargin;
  for (let i = 0; i < numTimerBars; i++) {
    let timerBar = $('<div></div>').attr('id', 'timerBar');
    timerBarTopMargin = (numTimerBars / 6) * (i / 5);
    timerBar.css({
      "margin-top": `${timerBarTopMargin}vw`,
      "opacity": `${maxOpacity}`
    });
    timerBars.push(timerBar);
    timerBars[i].appendTo("#timerContainer");
    maxOpacity /= 1.3;
  }
}

// runTime()
//
//
function runTime() {
  if (removeTimeBar < 30) {
    timerBars[removeTimeBar].remove();
    removeTimeBar++;
  } else if (removeTimeBar >= numTimerBars) {
    clearInterval(myTime);
  }
}
