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
$(document).ready(setup);


// setup()
//
// Sets up everything
function setup() {
  $('body').css({
    "background-image": "url()"
  });
  puzzlePieces = [];
  allPiecesImgAddress = [];
  // Calls required data from JSON file
  $.getJSON("data/data.json")
    .done(dataLoaded) // If there is no error, runs dataLoaded function
    .fail(dataError); // otherwise, runs the dataError function

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
  let borderLeftValue = [30, 1170];

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
      if (g < 2) {
        displayableAreaHeight = 650;
        displayableAreaWidth = 270;
        borderLeft = borderLeftValue[g];
        borderTop = 10;
      }

      // Generates random x and y position
      let randPosX = borderLeft + Math.floor((Math.random() * (displayableAreaWidth)));
      let randPosY = borderTop + Math.floor((Math.random() * (displayableAreaHeight)));

      // Gets random image from the array and assigns to the html element
      let pieceImgAddress = getRandomElement(allPiecesImgAddress);
      let piece = $('<img>').attr({
        id: `piece${i}`,
        src: `${pieceImgAddress}`
      }).appendTo(".piecesContainer");
      piece.css({
        "width": "5.5vw",
        "left": `${randPosX}px`,
        "top": `${randPosY}px`,
        "position": "absolute"
      });
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
      let emptySpot = $('<img>').attr({
        id: `piece${i}`,
        src: `${image}`
      }).appendTo(`#spotToPosition${i}`);
      emptySpot.css({
        "width": "6vw"
      });
      // On click, changes the layer opacity to 0.6
      // emptySpot.one("click", function() {
      //   $(this).addClass("clicked").css({
      //     "opacity": "0.6"
      //   });
      // });

      // Makes the spot droppable
      // $(`#spotToPosition${i}`).droppable({
      //   drop: onDrop
      // });
    }
    // Goes for the next row
    numSpots += 9;
    totalNumSpots += 9;
  }
}

// dataError()
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}
