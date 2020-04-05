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

let $backbutton;
let $homebutton;
let $playAgain;
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
  startGame();
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
  makePuzzlePieces();
  makeEmptySpot(data);
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

  // If all of the pieces were dropped to puzzle board, removes the pieces container
  if ( $('#leftSidePieces').children().length === 0 ) {
    console.log($('#leftSidePieces').children().length);
    $('#leftSidePieces').remove();
  }
  if ( $('#rightSidePieces').children().length === 0 ) {
    console.log($('#rightSidePieces').children().length);
    $('#rightSidePieces').remove();
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


// backButton()
//
// Creates back button
function backButton() {
  $backbutton = $('<div></div>').attr('id', 'backbutton').text("back");
  $backbutton.css({
    "margin-top": "2vw",
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

// // homeButton()
// //
// // Creates home button
// function homeButton() {
//   // Creates html element and assigns button function to
//   $homebutton = $('<div></div>').attr('id', 'homeButton').text("Home").appendTo("#leftColumn");
//   $homebutton.button();
//
//   // On click, goes back to main page
//   $homebutton.on('click', function() {
//     window.location.href = "index.html"
//   });
// }
//
// // playAgainButton()
// //
// // Creates play again button
// function playAgainButton() {
//   // Creates html element and assigns button function to
//   $playAgain = $('<div></div>').attr('id', 'playAgainButton').text("Play again").appendTo("#rightColumn");
//   $playAgain.button();
//
//   // On click, reloads the page
//   $playAgain.on('click', function() {
//     window.location.href = "modelOne.html"
//   });
// }

// dataError()
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}
