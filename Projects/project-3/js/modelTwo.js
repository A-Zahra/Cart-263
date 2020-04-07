"use strict";

/********************************************************************
Project3 - Jigsaw puzzles
Zahra Ahmadi

Reference
********************************************************************/
let puzzles;
let displayableAreaWidth;
let displayableAreaHeight;
let borderTop;
let borderLeft = 0;
let numPieces = 48;
let puzzlePieces;
let allPiecesImgAddress;
let numLeftColumnDroppedPieces;
let numRightColumnDroppedPieces;
let questionsPackage;
let $backbutton;
let $homebutton;
let $playAgain;
let totalNumQuestions;
let displayQuestion;
let displayTimeIntervals = 15000;
let pieceDisplacement = false;
let numQuestionsShown = 0;
let questionsChart;
let rightAnswer = 0;
let wrongAnswer = false;
let popUpQuestion;
let timeToAnswer;
let seconds ;
let earlyVictory = false;
$(document).ready(setup);


// setup()
//
// Sets up everything
function setup() {
  $('body').css({
    "background-image": "url()",
    "background-color": "black"
  });
  numLeftColumnDroppedPieces = 0;
  numRightColumnDroppedPieces = 0;
  puzzlePieces = [];
  allPiecesImgAddress = [];
  questionsPackage = [];
  totalNumQuestions = 10;
  questionsChart = [];
  startGame();

    // Speech recognition code which gives user the opportunity to orally interact with the website
    if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      '*text': checkAnswer // If user said "I am a (animal name)", prompts show me function
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();

    // Activates debug mode for detailed logging in the console
    annyang.debug();
    }
}

// startGame()
//
// Displays the puzzle complete image and then starts the game
function startGame() {
  // Creates and adds the puzzle image to DOM element
  let puzzleImage = $('<img>').attr({src: "assets/images/Level2/desert.jpg"}).css({
    "width": "50vw",
    "position": "absolute",
    "margin-top": "3vw"
  }).appendTo('.puzzleImageContainer');
  // After 5 seconds, explodes the image..
  setTimeout(function() {
    puzzleImage.effect("explode", "slow");
  }, 5000);
  // Two seconds after the image explosion shows the game screen
  setTimeout(function() {
    // Calls required data from JSON file
    $.getJSON("data/data.json")
      .done(dataLoaded) // If there is no error, runs dataLoaded function
      .fail(dataError); // otherwise, runs the dataError function
      backButton();
  }, 7000);
}

// dataLoaded()
//
// Creates and runs dataLoaded funtion
function dataLoaded(data) {
  // Gets data from Json file
  puzzles = [{
      id: "desert",
      length: data.puzzles.secondPuzzle.desert.length,
      pieces: data.puzzles.secondPuzzle.desert
    }
    // {
    //   id: "spring",
    //   length: data.puzzles.firstPuzzle.blossom.length,
    //   pieces: data.puzzles.firstPuzzle.blossom
    // }
  ];
  for (let i = 0; i < 10; i++) {
    questionsPackage.push(data.questionsPackage[i]);
  }
  // totalNumQuestions = $('<p></p>').attr('id', 'totalNumQuestions').appendTo('#puzzleBoard');

  displayQuestion = setInterval(makeQuestions, displayTimeIntervals);
  // makeQuestions();
  displayNumQuestions();
  makePuzzlePieces();
  makeEmptySpot(data);
}

// makeQuestions()
//
// Creates question popUp window
function makeQuestions() {
  console.log(questionsPackage.length);
  if (questionsPackage.length >= 1) {
    $('#rightSidePieces').hide();
    $('#leftSidePieces').hide();
    let randomQuestionSet = getRandomElement(questionsPackage);
    // Creates a pop up window
    popUpQuestion = $('<div></div>').addClass("popUpQuestion").appendTo('.secondPuzzleModels');
    let question = $('<h2></h2>').addClass("question").text(`${randomQuestionSet.question}`).appendTo('.popUpQuestion');
    let clue = $('<h3></h3>').addClass("clue").text(`CLUE: ${randomQuestionSet.clue}`).appendTo('.popUpQuestion');
    rightAnswer = randomQuestionSet.answer.toUpperCase();
    seconds = 12;
    let questionTimer = $('<p></p>').addClass("questionTimer").appendTo('.popUpQuestion');

    timeToAnswer = setInterval(function() {
      questionTimer.text(`${seconds}`);
      seconds--;
      if (seconds < 0) {
          $('#rightSidePieces').show();
          $('#leftSidePieces').show();
          popUpQuestion.remove();
          removeRandomQuestion(randomQuestionSet);
          clearInterval(timeToAnswer);

      }
    }, 1000);

    // displayTimeIntervals = 15000;
    totalNumQuestions--;
    updateQuestionsChart(totalNumQuestions);
  }
  else {
    checkPuzzleCompletion();
  }

}

function displayNumQuestions () {
  for (let i = 0; i < totalNumQuestions; i++) {
    let questionBar = $('<div></div>').attr('id', 'questionBar').appendTo('.questionsChart');
    questionBar.css({
      "width": "1vw",
      "height": "2vw",
      "background-color": "red",
      "display": "table",
      "float": "left",
      "margin": "0.2vw"
    });
    questionsChart.push(questionBar);
  }
}

function updateQuestionsChart (totalNumQuestions) {
  questionsChart[totalNumQuestions].remove();
}

// removeRandomQuestion()
//
// Removes the last used question from array to not be chosen again
function removeRandomQuestion(question) {
  questionsPackage.splice($.inArray(question, questionsPackage), 1);
}

function checkAnswer(answer) {
  let playerAnswer = answer.toUpperCase();
  if(playerAnswer === rightAnswer) {
    seconds = 1;
    clearInterval(displayQuestion);
    displayTimeIntervals = 18000;
    displayQuestion = setInterval(makeQuestions, displayTimeIntervals);
  }
  else {
    if (seconds < 0 && questionsPackage.length >= 1) {
      clearInterval(displayQuestion);
      // makeQuestions();
    }

  }
}

function checkPuzzleCompletion() {
  // If all of the pieces were dropped to puzzle board, removes the pieces container
  if ( $('#leftSidePieces').children().length !== 0 || $('#rightSidePieces').children().length !== 0 ) {
    // console.log($('#leftSidePieces').children().length + " and " + $('#rightSidePieces').children().length );
    $('#leftSidePieces').remove();
    $('#rightSidePieces').remove();
    $('.questionsChart').remove();
    $backbutton.remove();
    clearInterval(displayQuestion);
    setTimeout(gameOver, 3000);
  }
  else if ( $('#leftSidePieces').children().length === 0 && $('#rightSidePieces').children().length === 0 ) {
    // console.log($('#leftSidePieces').children().length + " and " + $('#rightSidePieces').children().length );
    $('#leftSidePieces').remove();
    $('#rightSidePieces').remove();
    $('.questionsChart').remove();
    $backbutton.remove();
    clearInterval(displayQuestion);
    setTimeout(victoryScreen, 3000);
  }
}

// makePuzzlePieces()
//
// Makes puzzle pieces and assign them to html elements
function makePuzzlePieces() {
  // Defines left position of the pieces
  // let borderLeftValue = [30, 1170];

  let piecesContainer = ["leftSidePieces", "rightSidePieces"];
  // Gets pieces images from Json file and assigns them to an array
  for (let j = 0; j < numPieces; j++) {
    let pieceImage = puzzles[0].pieces[j];
    allPiecesImgAddress.push(pieceImage);
  }

  // Makes two columns of puzzle pieces and displays them on the sides
  let numPiecesToShow = 0;
  let totalNumPiecesToShow = 24;
  // Makes two columns
  for (var g = 0; g < 2; g++) {
    // Creates puzzle pieces
    for (let i = numPiecesToShow; i < totalNumPiecesToShow; i++) {
      // Defines a vertical rectangular area of display for the pieces
        displayableAreaHeight = Math.floor(($('.columns').height() * 0.7));
        displayableAreaWidth = Math.floor($('.columns').width()/4.5);

      if (g === 0) {
        borderLeft = -30;
      } else if (g === 1) {
        borderLeft = +30;
      }

      // Generates random x and y position
      let randPosX = borderLeft + Math.floor((Math.random() * (displayableAreaWidth)));
      let randPosY = Math.floor((Math.random() * (displayableAreaHeight)));

      // Gets random image from the array and assigns to the html element
      let pieceImgAddress = getRandomElement(allPiecesImgAddress);
      let pieceId = findPieceId(pieceImgAddress);

      let piece = $('<img>').attr({
        id: `piece${pieceId}`,
        src: `${pieceImgAddress}`
      }).appendTo(`#${piecesContainer[g]}`);
      piece.css({
        "width": "4.5vw",
        "left": `${randPosX}px`,
        "top": `${randPosY}px`,
        "position": "relative"
      });
      piece.draggable();
      // makes an array of pieces
      puzzlePieces.push(piece);
      // Removes the image from the images array so that it won't be used again
      removeRandomElement(pieceImgAddress);
    }
    // Goes for the nex column
    numPiecesToShow += 24;
    totalNumPiecesToShow += 24;
  }
}

// getRandomElement()
//
// Gets random element from the images array
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

// removeRandomElement()
//
// Removes the last used image from array to not be chosen again
function removeRandomElement(image) {
  allPiecesImgAddress.splice($.inArray(image, allPiecesImgAddress), 1);
}

// makeEmptySpot()
//
// Makes empty spots to drop puzzle pieces into
function makeEmptySpot(data) {
  let numSpots = 8;
  let totalNumSpots = 0;
  // Creates six rows..
  for (var j = 0; j < 6; j++) {
    //each containing eight spots
    for (var i = numSpots; i >= totalNumSpots; i--) {
      // Gets data from JSON file
      let image = data.puzzles.secondPuzzle.emptySpot;
      // Adds a piece with a similar shape of puzzle piece to occupy the space until the real piece is dropped
      let emptySpotImage = $('<img>').addClass(`piece${i}`).attr({src: `${image}`}).appendTo(`#spotToPosition${i}`);
      emptySpotImage.css({
        "width": "6vw"
      });

      // Makes the spot droppable
      $(`#spotToPosition${i}`).droppable({
        drop: onDrop
      });
    }
    // Goes for the next row
    numSpots += 9;
    totalNumSpots += 9;
  }
}

// onDrop()
//
// On drop, implements the following code
function onDrop (event, ui) {
  // Gets the spot id
  let emptySpotId = $(this).attr('id');
  let spotId = findSpotId(emptySpotId);
  // Gets the piece id
  let pieceId = findPieceId(ui.draggable.attr('id'));

  //If the ids are equal runs the following code
  if ( spotId === pieceId) {
    // Empty spot for adding the piece to
    $(this).empty();
    // Gets the piece image source
    let droppedPieceImg = ui.draggable[0].src;
    // Makes a new piece with all the same properties of the dropped piece
    let newPiece = $('<img>').attr({
      id: `${pieceId}`,
      src: `${droppedPieceImg}`
    }).css({
      "width": "6vw"
    }).appendTo($(this));

    // Removes the piece dropped
    ui.draggable.remove();
  }
  else {
    $(this).effect("shake", {
      direction: "left",
      times: 5,
      distance: 5
    }, 400).css({
      "background-color": "red"
    });
  }

  // // If all of the pieces were dropped to puzzle board, removes the pieces container
  // if ( $('#leftSidePieces').children().length === 0 ) {
  //   console.log($('#leftSidePieces').children().length);
  //   $('#leftSidePieces').remove();
  // }
  // if ( $('#rightSidePieces').children().length === 0 ) {
  //   console.log($('#rightSidePieces').children().length);
  //   $('#rightSidePieces').remove();
  // }
  if ($('#leftSidePieces').children().length === 0 && $('#rightSidePieces').children().length === 0) {
    earlyVictory = true;
  }
}

// findPieceId()
//
// Finds the digit placed in the id name in order to be used as the piece id
function findPieceId(piece) {
  let pieceIdLength = piece.length;
  let numChars = 0;
  let numCharsToNotCount = 0;
  let charToShow = 0;

  if (pieceIdLength > 10) {
    numChars = 34
    numCharsToNotCount = 4;
    charToShow = 28;
  } else {
    numChars = 7;
    charToShow = 5;
    numCharsToNotCount = 0;
  }
  // Finds the character that is going to be used as the id
  let pieceId;
  if (piece.length < numChars) {
    pieceId = piece.charAt(charToShow);
  } else if (piece.length > numChars - 1) {
    pieceId = piece.substring(charToShow, piece.length - numCharsToNotCount);
  }
  return pieceId;
}

// findSpotId()
//
// Finds the digit placed in the id name in order to be used as the spot id
function findSpotId (spot) {
  let spotId;
  if (spot.length < 15) {
    spotId = spot.charAt(14);
  } else if (spot.length > 14) {
    spotId = spot.substring(14, spot.length);
  }
  return spotId;
}

// gameOver()
//
// Displays gameOver screen
function gameOver() {
  // Changes the background color
  $('body').css({
    "background-color": "red",
    "display": "block"
  }).fadeTo(500, 1);
  // Shakes the puzzle
  $('.innerRow0').effect("shake", {
    direction: "left",
    times: 5,
    distance: 10
  }, 700);

  $backbutton.hide();
  // After 6 seconds, runs the following code
  setTimeout(function() {
    // Creates a pop up window
    let popUpWindow = $('<div></div>').addClass("popUpWindow").appendTo('.secondPuzzleModels');
    let victoryMessage = $('<h3></h3>').addClass("victoryMessage").text("Game Over!!!").appendTo('.popUpWindow');
    let rowOfButtons = $('<div></div>').addClass("rowOfButtons").appendTo('.popUpWindow');
    // Home button container
    let leftButton = $('<div></div>').addClass("buttonPosition").attr('id', 'leftColumn').appendTo('.rowOfButtons');
    // Play again button container
    let rightButton = $('<div></div>').addClass("buttonPosition").attr('id', 'rightColumn').appendTo('.rowOfButtons');

    // Calls home and play again buttons functions
    homeButton();
    playAgainButton();
  }, 4000);
}


// victoryScreen()
//
// Displays victory screen
function victoryScreen() {
  // Displays paper explosion gif
  let imageUrl = "https://i.gifer.com/VZvx.gif";
  $('.victoryReward').css({
    "display": "block",
    "background-image": 'url(' + imageUrl + ')',
    "background-size": "cover",
    "background-repeat": "no-repeat",
    "background-position-y": "-10vw",
    "height": "auto"
  });

  // Hides back button
  $backbutton.hide();
  // After 6 seconds, runs the following code
  setTimeout(function() {
    // Creates a pop up window
    let popUpWindow = $('<div></div>').addClass("popUpWindow").appendTo('.secondPuzzleModels');
    let victoryMessage = $('<h3></h3>').addClass("victoryMessage").text("Good Job Buddy!!!").appendTo('.popUpWindow');
    let rowOfButtons = $('<div></div>').addClass("rowOfButtons").appendTo('.popUpWindow');
    // Home button container
    let leftButton = $('<div></div>').addClass("buttonPosition").attr('id', 'leftColumn').appendTo('.rowOfButtons');
    // Play again button container
    let rightButton = $('<div></div>').addClass("buttonPosition").attr('id', 'rightColumn').appendTo('.rowOfButtons');

    // Calls home and play again buttons functions
    homeButton();
    playAgainButton();
  }, 6000);
}

// backButton()
//
// Creates back button
function backButton() {
  $backbutton = $('<div></div>').attr('id', 'backbutton').text("back");
  $backbutton.css({
    "margin-top": "-1vw",
    "margin-left": "22vw",
    "font-size": "1.5vw",
    "color": "white",
    "background-color": "gold"
  });
  $backbutton.button();
  // Appends the button to FirstPuzzleModels div
  $backbutton.appendTo("#puzzleBoard");
  // On click, goes back to main page
  $backbutton.on('click', function() {
    window.location.href = "index.html"
  });
}

// homeButton()
//
// Creates home button
function homeButton() {
  // Creates html element and assigns button function to
  $homebutton = $('<div></div>').attr('id', 'homeButton').text("Home").appendTo("#leftColumn");
  $homebutton.button();

  // On click, goes back to main page
  $homebutton.on('click', function() {
    window.location.href = "index.html"
  });
}

// playAgainButton()
//
// Creates play again button
function playAgainButton() {
  // Creates html element and assigns button function to
  $playAgain = $('<div></div>').attr('id', 'playAgainButton').text("Play again").appendTo("#rightColumn");
  $playAgain.button();

  // On click, reloads the page
  $playAgain.on('click', function() {
    window.location.href = "modelTwo.html"
  });
}

// dataError()
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}
