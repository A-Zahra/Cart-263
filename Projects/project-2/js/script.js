"use strict";

/*************************************************************************************

Guess who I am - card game
Zahra Ahmadi

Is a guessing card game inwhich the player should guess what is the animal's name by
reading the animal's self description. To gives his/her answer, he/she should say
"I am a (animal name)" and to go to the next card, he/she should say "next". If the answer
is not correct, the player is warnned that their answer is wrong. If the player couldn't guess
the correct answer, they can give up to see the image by saying "I give up".
To win the game the player should answer at least 5 questions. However, there is no winning
and even if the player answers more than 5 questions he/she won't win.
I did this intentionally for the idea of "something is wrong on the internet".
Some of the main features of this game are:
1. The timer
2. Score counter
3. Randomly picked cards which are displayed every time the page is reloaded or restarted

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

bat
https://www.1zoom.me/en/wallpaper/64878/z155.8/

Turtle
https://www.pngfuel.com/free-png/bnliq

Penguin
https://www.uihere.com/free-cliparts/skipper-kowalski-penguin-madagascar-film-madagascar-penguins-png-1194703/download

Giraffe
https://www.pngfuel.com/free-png/alupb

bees
https://www.uihere.com/free-cliparts/barry-b-benson-film-poster-image-animated-film-bees-flying-clipart-5741993/download

owl
https://www.goodfon.com/wallpaper/chiornyi-fon-sova-dozhd-vzgliad.html

mouse
https://www.pngfuel.com/free-png/abnwy
-----------------------------------------------------------------------------------------
**Animals' names**
https://github.com/dariusk/corpora/blob/master/data/animals/common.json
-----------------------------------------------------------------------------------------
** Animals' sounds**
https://www.freesoundeffects.com/
https://www.findsounds.com/
https://www.videvo.net/sound-effect/lion-growl-angry-gene-pe931903/249943/

*****************************************************************************************/

// An array of animals' names and descriptions
// Be used for several purposes like
let animalPackage = 0;
let selfDefinition; // Holds self definition sentence
let whoAmI; // Holds the question
let cardImg = 0; // Holds animal image
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
let gaveUp = false; // Checks if the player gave up
let gameStarted = false; // Checks if game started
// Sounds variables
let tiger = 0;
let leopard = 0;
let owl = 0;
let lion = 0;
let gorilla = 0;
let bat = 0;
let wolf = 0;
let snake = 0;
let bear = 0;
// Get setup!
$(document).ready(setup);

// setup()
//
// Sets up everything
function setup() {
  let timeoutDuration = 1500;

  startScreen();
  // On click, prompts start game function

  // Speech recognition code which gives user the opportunity to orally interact with the website
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I am (a) (an) *text': showMe, // If user said "I am a (animal name)", prompts show me function
      'next': nextCard, // If he said "next", prompts nextCard function
      // If he said "I give up", displays the animal name and go next
      'I give up': function() {
        console.log("gaveUp");
        if (!gaveUp) {

          gaveUp = true;
          gameStarted = true;
          showMe(animalPackage[cardNum].name);
          setTimeout(nextCard, timeoutDuration);
        }
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();

    // Activates debug mode for detailed logging in the console
    annyang.debug();
  }
}

// resetGame()
//
// Resets game's elements
function resetGame() {
  startScreen();
}

// startScreen()
//
// Displays game start screen
function startScreen() {
  // An array of animal names and clues
  // Be used for several purposes like
  animalPackage = [{
      name: "dog",
      clue: "I am playful and do not share my lovely bone with anyone!"
    },
    {
      name: "deer",
      clue: "I have big and beautiful antlers! I live both in north and south America!"
    },
    {
      name: "gorilla",
      clue: "I love banana! I am black and have strong teeth!"
    },
    {
      name: "frog",
      clue: "I live on wetLands and rivers. Flies are my favorite food!"
    },
    {
      name: "sloth",
      clue: "I am sooo Slow and love hanging trees!"
    },
    {
      name: "bear",
      clue: "I love honey and fish! I have rounded ears and big claws!"
    },
    {
      name: "leopard",
      clue: "I am a wild cat that his fur is marked with rosettes!"
    },
    {
      name: "parrot",
      clue: "I like to repeat people words and I have colorful wings!"
    },
    {
      name: "wolf",
      clue: "I hunt sheeps and dogs are my main enemy!"
    },
    {
      name: "rabbit",
      clue: "I am smart and fast! carrot is my favorite food!"
    },
    {
      name: "snake",
      clue: "I don't have limbs but I'm fast and crawl on the ground!"
    },
    {
      name: "lion",
      clue: "I have mane around my neck and live in a group!"
    },
    {
      name: "donkey",
      clue: "I am stubborn! I always wanted to be like a horse but I am not!"
    },
    {
      name: "zebra",
      clue: "My skin is striped! I am an herbivore and moslty live in Africa!"
    },
    {
      name: "tiger",
      clue: "I am a large cat! my orange skin has vertical black stripes!"
    },
    {
      name: "bat",
      clue: "I live in caves. I hate light and I hunt in the dark!"
    },
    {
      name: "turtle",
      clue: "I am too slow and carry my home on my back!"
    },
    {
      name: "penguin",
      clue: "I'm the only bird that doesn't fly and I live in the Arctic!"
    },
    {
      name: "giraffe",
      clue: "I have extremely long neck and legs!"
    },
    {
      name: "bee",
      clue: "I make honey!"
    },
    {
      name: "owl",
      clue: "I have a flat face with large eyes! my neck rotates 270 degrees!"
    },
    {
      name: "mouse",
      clue: "I love cheese and of course hate cats!"
    }
  ];
  endGame = false;
  cardImg = 0;
  cardNum = 0;
  numPointBars = 0;
  pointBarTopMargin = 0;
  numTimerBars = 30;
  removeTimeBar = 0;
  timerBars = [];
  maxOpacity = 255;
  myTime = 0;
  questionWasReplied = false;
  timeLeft = 0;
  gaveUp = false;
  gameStarted = false;

  // Sets background color to white
  $('.column1').css({
    "background-color": "white"
  });
  // Empties innerCollection div
  $('.innerCollection').empty();
  // reDefines self definition once the game restarts
  let selfDef = $('<p></p>').attr('id', 'selfDefinition');
  selfDef.appendTo('.innerCollection');

  // Adds game title
  gameTitle = $('<h2></h2>').attr('id', 'gameTitle').text("Who am I?");
  // Adds question to html file and puts it before description paragraph
  gameTitle.appendTo(".innerCollection").after($("#gameDescription"));
  // Inserts game description element
  gameDescription = $('<p></p>').attr('id', 'gameDescription').html("Is a guessing card game inwhich you should guess animal's name by reading the animal's self-description. To give your answer, say 'I am a/an (animal's name)'.To go to the next card, say 'next'. If you couldn't guess properly, say 'I give up' to see the right answer and it will automatically go next. To win this game you should answer <span>at least 5 questions</span>.");
  gameDescription.appendTo('.innerCollection');
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

// startGame()
//
// Runs timer + prompts question function
function startGame() {
  let intervalDuration = 2500;
  gameStarted = true;
  gameTitle.remove();
  gameDescription.remove();
  $button.remove();
  timer();
  myTime = setInterval(runTime, intervalDuration);
  question();
}

// getRandomElement()
//
// Gets random elements from animals array and return its index number
function getRandomElement(animal) {
  let cardNumber;
  // Random element
  let element = animal[Math.floor(Math.random() * animal.length)];
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
  let fadeDuration = 500;
  // If game hasn't end,
  if (!endGame) {
    whoAmI = $('<p></p>').attr('id', 'whoAmI').text("WHO AM I?");
    // Adds question to html file and puts it before description paragraph
    whoAmI.appendTo(".innerCollection");
    whoAmI.fadeIn(fadeDuration);
    whoAmI.css({
      "display": "table"
    }).after($("#selfDefinition"));
    // Displays description sentence
    descriptions();
  }
}

// descriptions()
//
// Creates and displays random animals self description
function descriptions() {
  let animalsNotEmpty = 0;
  let fadeDuration = 500;
  // If game hasn't end,
  if (!endGame) {
    // Gets random description
    if (animalPackage.length !== animalsNotEmpty) {
      cardNum = getRandomElement(animalPackage);
    } else if (animalPackage.length < animalsNotEmpty) {
      cardNum = undefined;
    }
    // Adds description to html file
    selfDefinition = $("#selfDefinition");
    let definition = animalPackage[cardNum].clue;
    selfDefinition.text(definition);
    selfDefinition.fadeIn(fadeDuration);
    selfDefinition.css({
      "display": "table"
    });
  }
}

// showMe()
//
// If player said purposed word,
function showMe(myString) {
  // If it is the right animal name and game hasn't end,
  if (myString === animalPackage[cardNum].name && !endGame && gameStarted) {
    // console.log("SHOW IMAGE");
    // Creates and adds the image to html file
    let animalName = animalPackage[cardNum];
    cardImg = $('<img>').addClass(animalName).attr('src', 'assets/images/' + animalPackage[cardNum].name + ".png");
    // Adds wild animal sounds
    switch (myString) {
      case "tiger":
        tiger = new Audio("assets/sounds/tiger.wav");
        tiger.play();
        break;
      case "wolf":
        wolf = new Audio("assets/sounds/wolf.wav");
        wolf.play();
        break;
      case "lion":
        lion = new Audio("assets/sounds/lion.mp3");
        lion.play();
        break;
      case "leopard":
        leopard = new Audio("assets/sounds/leopard.wav");
        leopard.play();
        break;
      case "snake":
        snake = new Audio("assets/sounds/snake.wav");
        snake.play();
        break;
      case "bear":
        bear = new Audio("assets/sounds/bear.wav");
        bear.play();
        break;
      case "bat":
        bat = new Audio("assets/sounds/bat.wav");
        bat.play();
        break;
      case "owl":
        owl = new Audio("assets/sounds/owl.mp3");
        owl.play();
        break;
      case "gorilla":
        gorilla = new Audio("assets/sounds/gorilla.mp3");
        gorilla.play();
        break;
      default:
        console.log("not a wild");
    }
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
    let fadeDuration = 400;
    cardImg.fadeIn(fadeDuration);
    cardImg.appendTo('.column1');
    cardImg.after($(".innerCollection"));
    // Hides the question and the description
    selfDefinition.css({
      "display": "none"
    });
    whoAmI.css({
      "display": "none"
    });

    // If the player gave up don't add to his score, otherwise do it
    if (!gaveUp) {
      // If answer is correct, adds one to score bar
      numPointBars++;
      // And positions the new bar far from the previous onended(callback)
      // by 1% of the width of the viewport*
      pointBarTopMargin += 1;

      // Displays score counter
      pointCounter();
      gaveUp = true;
    }
    // Confirms the answer was true
    questionWasReplied = true;
    // Makes the gameStarted false, so if the player mistakenly repeated his answer, it won't add a new image to the screen
    gameStarted = false;
  }
  // Otherwise asks the player answers again
  else if (myString !== animalPackage[cardNum].name && gameStarted && !endGame) {
    let option = {
      rate: 0.8
    };
    responsiveVoice.speak("Wrong answer!", "UK English Male", option);
  }
}

// removePreviousCard()
//
// Removes elements of previous card
function removePreviousCard() {
  // descriptionList = jQuery.grep(descriptionList, function(value) {
  //   return value != descriptionList[cardNum];
  // });
  // console.log(descriptionList);
  animalPackage = jQuery.grep(animalPackage, function(value) {
    return value != animalPackage[cardNum];
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
    // Removes previous card image
    cardImg.remove();

    // If gaveUp is true, pauses animal sound
    if (gaveUp) {
      switch (animalPackage[cardNum].name) {
        case "tiger":
          tiger.pause();
          break;
        case "wolf":
          wolf.pause();
          break;
        case "leopard":
          leopard.pause();
          break;
        case "snake":
          snake.pause();
          break;
        case "bear":
          bear.pause();
          break;
        case "bat":
          bat.pause();
          break;
        case "owl":
          owl.pause();
          break;
        case "gorilla":
          gorilla.pause();
          break;
        case "lion":
          lion.pause();
          break;
        default:
          console.log("not a wild");
      }
    }

    // Shows next question
    removePreviousCard();
    question();
    gaveUp = false;
    gameStarted = true;
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
        "opacity": `${numPointBars/6}`
      });
      // Adds new score bar to the array
      pointBars.push(counter);
      // Adds them to html file one by one
      pointBars[i].appendTo("#counterContainer");
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
  let totalNumTimeBars = 30;
  // If number of removed time bars is not less than total number of time bars,
  if (removeTimeBar < totalNumTimeBars) {
    // Removes current time bar
    timerBars[removeTimeBar].remove();
    // Adds one to the number of removed time bars
    removeTimeBar++;
    let options = {
      rate: 0.8
    };
    // Warns the player that only 10 seconds is left
    let timeToWarn = 24;
    if (removeTimeBar === timeToWarn) {
      timeLeft = 15;
      responsiveVoice.speak(`You have ${timeLeft} seconds left`, "UK English Male", options);
    }
  }
  // Otherwise removes the timer + announces game end + Displays gameOver screen
  else if (removeTimeBar === numTimerBars) {
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
    if (cardImg !== 0) {
      cardImg.remove();
    }
    $('#counterContainer').empty();
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

  let playAgain = $('<div></div>').attr('id', 'playAgain').text("Play again!");
  playAgain.button();
  // Adds the button to html file
  playAgain.appendTo(".innerCollection");
  // On click, prompts startGame function
  playAgain.on('click', resetGame);
}
