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
let numPointBars = 0; // Number of score bars is accumulated in
let pointBarTopMargin = 0; // score bars position
let numTimerBars = 30; // Holds number of time bars
let removeTimeBar = 0; // Specifies number of time bars should be removed
let timerBars = []; // Stores time bars
let maxOpacity = 255; // Maximum opacity
let myTime = 0; // Stores timer
let questionWasReplied = false; // Checks if the question was replied
let timeLeft = 0; // Holds number of seconds left
let gameTitle; // Holds game name
let gameDescription; // Holds game description
let $button; // Play button
let endGame = false; // Checks if game ended
let pointBars; // An array to store point bars

// Get setup!
$(document).ready(setup);

// setup()
//
// Sets up everything
function setup() {
  startScreen();
  // On click, prompts start game function

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
// Runs timer + prompts question function
function startGame() {
  timer();
  myTime = setInterval(runTime, 3000);
  question();
  gameTitle.hide();
  gameDescription.hide();
  $button.hide();
}

// startScreen()
//
// Displays game start screen
function startScreen() {
  gameTitle = $('<h2></h2>').attr('id', 'gameTitle').text("Who am I?");
  // Adds question to html file and puts it before description paragraph
  gameTitle.appendTo(".innerCollection").after($("#gameDescription"));
  // Inserts game description element
  gameDescription = $('#gameDescription');
  // Prompts start button
  startButton();
}

// startButton()
//
// Creates an start button
function startButton() {
  $button = $('<div></div>').attr('id', 'button').text("Play!");
  $button.button();
  // Adds the button to html file
  $button.appendTo(".innerCollection");
  // On click, prompts startGame function
  $button.on('click', startGame);
}

// getRandomElement()
//
// Gets random elements from animals array and return its index number
function getRandomElement(animal) {
  let cardNumber;
  // Random element
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

// question()
//
// Makes and display game main question
function question() {
  // If game hasn't end,
  if (!endGame) {
    whoAmI = $('<p></p>').attr('id', 'whoAmI').text("WHO AM I?");
    // Adds question to html file and puts it before description paragraph
    whoAmI.appendTo(".innerCollection");
    whoAmI.fadeIn(500);
    whoAmI.css({
      "display": "table"
    }).after($("#selfDefinition"));
    // Displays description sentence
    descriptions();
    // Displays score counter
    pointCounter();
  }
}

// descriptions()
//
// Creates and displays random animals self description
function descriptions() {
  // If game hasn't end,
  if (!endGame) {
    // Gets random description
    if (animals.length !== 0) {
      cardNum = getRandomElement(animals);
    } else if (animals.length < 0) {
      cardNum = undefined;
    }
    // Adds description to html file
    selfDefinition = $("#selfDefinition");
    let definition = descriptionList[cardNum];
    selfDefinition.text(definition);
    selfDefinition.fadeIn(500);
    selfDefinition.css({
      "display": "table"
    });
    // selfDefinition.bind('click', showMe);
  }
}

// showMe()
//
// If player said purposed sentence,
function showMe(myString) {
  // Checks if it is the right animal name
  if (myString === animals[cardNum] && !endGame) {
    // Creates and adds the image to html file
    cardImg = $('<img>').addClass(animals[cardNum]).attr('src', 'assets/images/' + animals[cardNum] + ".png");
    console.log("animal name: " + animals[cardNum] + " card num: " + cardNum);
    // Gives css properties to
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

    // If it is the lion image makes it background black
    if (myString === "lion") {
      cardImg.css({
        "background-color": "black"
      });
    } else {
      cardImg.css({
        "background-color": "white"
      });
    }
    // Adds it to html file, adds fade effect to
    // and puts it before description paragraph
    cardImg.fadeIn(500);
    cardImg.appendTo('.column1');
    cardImg.after($(".innerCollection"));
    // Hides the question and the description
    selfDefinition.css({
      "display": "none"
    });
    whoAmI.css({
      "display": "none"
    });
    // Removes both the description and animal name after 5 miliseconds
    setTimeout(removePreviousCard, 500);

    // If answer is correct, adds one to score bar
    numPointBars++;
    // And positions the new bar far from the previous onended(callback)
    // by 1% of the width of the viewport*
    pointBarTopMargin += 1;
  }
  // Confirms the answer was true
  questionWasReplied = true;
}

// removePreviousCard()
//
// Removes elements of previous card
function removePreviousCard() {
  descriptionList = jQuery.grep(descriptionList, function(value) {
    return value != descriptionList[cardNum];
  });
  // console.log(descriptionList);
  animals = jQuery.grep(animals, function(value) {
    return value != animals[cardNum];
  });
  // console.log(animals);
}

// nextCard()
//
// If the question was answered and player said "next",
function nextCard() {
  if (questionWasReplied && !endGame) {
    // Removes previous question
    $('#whoAmI').remove();
    // Shows next question
    question();
    // Removes previous card image
    cardImg.remove();
    // Sets questionWasReplied value to false
    questionWasReplied = false;
  }
}

// pointCounter()
//
// Counts the player points
function pointCounter() {
  if (!endGame) {
    // Creates score bar divs and gives them a name
    let counter = $('<div></div>').attr('id', 'counter');
    pointBars = [];
    // Accumulates all the score bars in an array
    for (let i = 0; i <= numPointBars; i++) {
      // Sets their position and opacity proportional to each other
      counter.css({
        "margin-top": `${pointBarTopMargin}vw`,
        "opacity": `${numPointBars/10}`
      });
      // Adds new score bar to the array
      pointBars.push(counter);
      // Adds them to html file one by one
      pointBars[i].appendTo("#pointCounter");
    }
  }
}

// timer()
//
// Creates and displays timer
function timer() {
  let timerBarTopMargin;
  for (let i = 0; i < numTimerBars; i++) {
    // Creates time bar div and gives a name to
    let timerBar = $('<div></div>').attr('id', 'timerBar');
    timerBarTopMargin = (numTimerBars / 6) * (i / 5);
    // Sets their position and opacity proportional to each other
    timerBar.css({
      "margin-top": `${timerBarTopMargin}vw`,
      "opacity": `${maxOpacity}`
    });
    // Adds new time bar to the array
    timerBars.push(timerBar);
    // Adds them to html file one by one
    timerBars[i].appendTo("#timerContainer");
    // Reduces opacity of time bar in each round
    maxOpacity /= 1.3;
  }
}

// runTime()
//
// Runs time
function runTime() {
  // If number of removed time bars is not less than total number of time bars,
  if (removeTimeBar < 30) {
    // Removes current time bar
    timerBars[removeTimeBar].remove();
    // Adds one to the number of removed time bars
    removeTimeBar++;
    let options = {
      rate: 0.8
    };
    // Warns the player that only 15 seconds is left
    if (removeTimeBar === 25) {
      timeLeft = 15;
      responsiveVoice.speak(`You have ${timeLeft} seconds left`, "UK English Male", options);
    }
  }
  // Otherwise removes the timer + announces game end + Displays gameOver screen
  else if (removeTimeBar >= numTimerBars) {
    let options = {
      rate: 0.8
    };
    endGame = true;
    gameOver(endGame);
    responsiveVoice.speak(`Your time is over and you missed the game!`, "UK English Male", options);
    clearInterval(myTime);
  }
}

// gameOver()
//
// Hide last card and prompts gameOverScreen
function gameOver(endGame) {
  // If endGame is true,
  if (endGame) {
    $("#whoAmI").hide();
    $("#selfDefinition").hide();
    cardImg.hide();
  }
  gameOverScreen();
}

// gameOverScreen()
//
// Creates and displays game over screen elements
function gameOverScreen() {
  // Game over title
  let gameOverTitle = $('<div></div>').attr('id', 'gameOverTitle');
  gameOverTitle.text("GAME OVER");
  gameOverTitle.appendTo(".innerCollection");
  // Number of questions answered
  let numAnsweredQuestion = $('<div></div>').attr('id', 'numAnsweredQuestion');
  numAnsweredQuestion.text(`Number of questions answered in total is: ${numPointBars}`);
  numAnsweredQuestion.appendTo(".innerCollection");
  // Changes background color to red
  $('.column1').css({
    "background-color": "red"
  });
}
