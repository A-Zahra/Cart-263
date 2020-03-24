"use strict";

/********************************************************************
Project3 - Jigsaw puzzles
Zahra Ahmadi


Reference

GeeksforGeeks:
https://www.geeksforgeeks.org/jquery-first-with-examples/

draggable and droppable
https://stackoverflow.com/questions/42898090/jquery-ui-append-div-on-drop-and-make-appended-div-droppablenested
https://stackoverflow.com/questions/20025169/when-using-jquery-ui-droppable-how-can-you-remove-an-item-from-the-droppable-ar
https://stackoverflow.com/questions/19251597/jqueryui-multiple-droppable-elements
https://www.geeksforgeeks.org/jquery-ui-draggable-and-droppable-methods/
*********************************************************************/
let puzzleScreen;
let puzzle1pieces;
let numSlides;
let piecesInSlide = [];
let movablePiece = 1;
let li;
let arrowTop;
let arrowBottom;
let puzzlePiece;
let droppedPiece = 0;

$(document).ready(setup);

// setup()
//
// Sets up everything
function setup() {
  // Calls required data from JSON file
  $.getJSON("data/data.json")
    .done(dataLoaded) // If there is no error, runs dataLoaded function
    .fail(dataError); // otherwise, runs the dataError function
}

// dataLoaded()
//
// Creates and runs dataLoaded funtion
function dataLoaded(data) {
  firstPuzzle(data);
}

// firstPuzzle()
//
// Creates first puzzle and prompts pieces() funtion
function firstPuzzle(data) {
  puzzleScreen = $('<img>').addClass('puzzleScreen').attr('src', `${data.puzzles.firstPuzzle.puzzleScreen}`).appendTo('#template-container');
  let ul = $('<ul></ul>').addClass('content-slider').appendTo('.item');
  // Creates puzzle pieces and add them to the lightslider
  pieces(data);
}

// pieces()
//
// Creates puzzle pieces, adds them to the lightslider, makes them draggable
function pieces(data) {
  // Creates the top arrow
  arrowTop = $('<img>').addClass('arrowTop').attr('src', 'assets/images/arrowTop.png').appendTo(`.content-slider`);
  // Gets data from JSON file
  numSlides = data.puzzles.firstPuzzle.puzzlePieces.length;
  puzzle1pieces = data.puzzles.firstPuzzle.puzzlePieces;
  // Creates pieces and adds them to their relative slide
  for (let i = 0; i < numSlides; i++) {
    li = $('<li></li>').addClass(`slide${i}`).addClass("slideC").appendTo('.content-slider');
    let imgAddress = data.puzzles.firstPuzzle.puzzlePieces[i];
    puzzlePiece = $('<img>').addClass(`piece${i}Img`).css({
      "width": "6vw",
      "padding": "14px"
    }).attr('src', `${imgAddress}`).appendTo(`.slide${i}`);

    // Makes the piece draggable
    puzzlePiece.draggable();

    //SABINE EDIT
    //push the ENTIRE OBJECT to the pieceInSlide array
    piecesInSlide.push(puzzlePiece);

    // Displays only the first four pieces
    if (i > 3) {
      $(`.slide${i}`).hide();
    }
  }

  // Creates spots on the puzzle template to place the pieces
  spotsToPositionPieces(data);
  // Makes bottom arrow
  arrowBottom = $('<img>').addClass('arrowBottom').attr('src', 'assets/images/arrowBottom.png').appendTo(`.content-slider`);
  // On click, moves the slides up or down
  arrowTop.on('click', goNext);
  arrowBottom.on('click', goPrev);
}

// spotsToPositionPieces()
//
// Creates spots on the puzzle template to place the pieces and makes them droppable
function spotsToPositionPieces(data) {
  let numSpots = 5;
  let totalNumSpots = 0;
  // Creates five rows..
  for (var j = 0; j < 5; j++) {
    //each containing six spots
    for (var i = numSpots; i >= totalNumSpots; i--) {
      // Gets data from JSON file
      let image = data.puzzles.firstPuzzle.puzzlePiecesSpots[i];
      let pieceHidingLayer = $('<img>').addClass(`hidingLayer${i}`).attr({
        src: `${image}`
      }).css({
        "width": "100%",
        "opacity": "0"
      }).appendTo(`#spotToPosition${i}`);

      // Makes the spot droppable
      $(`#spotToPosition${i}`).droppable({
        drop: onDrop
      });
    }
    // Goes for the next row
    numSpots += 6;
    totalNumSpots += 6;
  }
}

// onDrop()
//
// On drop, reads the following code and implements it
function onDrop(event, ui) {
  // If the spot has not been already filled...
  if (!($(this).hasClass("dropped"))) {

    // Adds "dropped" class so that this spot can't be filled again
    $(this).addClass("dropped");

    // SABINE EDIT START:
    //The one we dropped AND CHECK THAT IT IS NOT ONE ALREADY DROPPED ...
    let classNameOfParent = $(ui.draggable[0]).parent().attr('class');
    if (classNameOfParent.includes("slideC")) {
      //CUSTOM FUNCTION TO REMOVE FROM THE ARRAY (BASED ON THE SRC OF THE IMAGE)
      let indexToRemove = findArrayIndex(ui.draggable, piecesInSlide);
      piecesInSlide.splice(indexToRemove, 1);
      // SABINE EDIT END.


      // Gets the spot id, Gets the piece first class
      // Finds the digit embeded in the spot and the piece + assigns them to variables
      let itemId = $(this).attr("id");
      let setSpotId = findSpotId(itemId);
      let droppedPieceFirstClass = $(ui.draggable[0]).attr("class").split(' ')[0];
      let setPieceId = findPieceId(droppedPieceFirstClass);

      // SABINE EDITS START:
      // Makes a copy ..
      // Removes the other ...
      let droppedOne = $('<img>').addClass(`droppedPiece${setSpotId}`).css({
        "width": "100%",
        "opacity": "0"
      }).attr({id:`piece${setPieceId}Img`, src:`${ui.draggable[0].src}`}).appendTo($(this));
      $(`.hidingLayer${setSpotId}`).remove();

      // Removes everyone up ...
      $(ui.draggable[0]).parent().remove();

      //SABINE: also needs to ensure that the correct ones are showing
      let slides = $(".slideC");

      // SHOWS THE FIRST FOUR ..
      for (let j = 0; j <= 3; j++) {
        $(slides[j]).show();
      }

      // Once all the pieces were dropped to the empty spots prompts the function
      if (piecesInSlide.length === 24) {
        makePuzzleFullSize();
      }
    }
  } else {
    console.log("not in list and is a different type of droppable");
  }
  // SABINE EDITS END.
}

// goNext()
// Sabine simplified and modified my code
// Once the up arrow is clicked, shows the next hidden piece on bottom and hides the first piece on top of slider
function goNext() {
  let slides = $(".slideC");
  // Stores first piece in the slider
  let putATend = piecesInSlide[0];

  // Moves along
  for (let i = 0; i < piecesInSlide.length - 1; i++) {
    piecesInSlide[i] = piecesInSlide[i + 1];
    $(slides[i]).html(piecesInSlide[i]);
  }
  // Hides last piece
  piecesInSlide[piecesInSlide.length - 1] = putATend;
  // Needs to remake it draggable
  piecesInSlide[piecesInSlide.length - 1].draggable();
  $(slides[piecesInSlide.length - 1]).html(piecesInSlide[piecesInSlide.length - 1]);
}

// goPrev()
// Sabine simplified and modified my code
// Once the down arrow is clicked, shows the next hidden piece on top and hides the last piece on bottom of slider
function goPrev() {
  let slides = $(".slideC");
  // Stores last piece in the slider
  let firstPiece = piecesInSlide[piecesInSlide.length - 1];

  // Moves along
  for (let i = piecesInSlide.length - 1; i > 0; i--) {
    piecesInSlide[i] = piecesInSlide[i - 1];
    $(slides[i]).html(piecesInSlide[i]);
  }
  // Hides last
  piecesInSlide[0] = firstPiece;
  // Needs to remake it draggable
  piecesInSlide[0].draggable();
  $(slides[0]).html(piecesInSlide[0]);
}

// makePuzzleFullSize()
//
// Removes the slider column, reveal the pieces dropped to the puzzle board
// checks the piece arrangment. If true display victory screen, else displays game over screen
function makePuzzleFullSize() {
  let numPiecesFadeIn = 0;
  let totalNumPiecesFadeIn = 5;
  let fadeTime = 100;

  // Removes light slider column
    $('.columnToRemove').remove();
    $('.column').css({
      "width": "100%",
      "float": "none"
    });
    // Makes the rows of pieces fade in with delay
    for (var i = 1; i < 2; i++) {
      $(`.row${i}`).css({
        "margin-left": "7.5vw"
      });
      for (var j = numPiecesFadeIn; j <= totalNumPiecesFadeIn; j++) {
        $(`.droppedPiece${j}`).fadeTo( fadeTime , 1 );
      }
      numPiecesFadeIn += 6;
      totalNumPiecesFadeIn += 6;
      fadeTime += 700;
    }
    // Prompts checkPuzzleArrangement function
    checkPuzzleArrangement();
}

// checkPuzzleArrangement()
//
// Checks whether the pieces are placed in the right position or not
function checkPuzzleArrangement() {
  for (var p = 0; p < 6; p++) {
    let getSpotId = `spotToPosition${p}`;
    let checkSpotId = findSpotId(getSpotId);
    let getPieceId = $(`.droppedPiece${p}`).attr("id");
    let checkPieceId = findPieceId(getPieceId);

    // Compare the spot and the piece ids.
    // If all of them are the same, displayes victory screen, else gameOver screen
    if (checkSpotId === checkPieceId) {
      // gameOver();
      console.log("in correct spot " + checkPieceId);
    }
  }
}

// dataError()
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}

// findArrayIndex()
// FUNCTION MADE BY SABINE
// FINDS INDEX OF THE ELEMENT WHICH SHOULD BE REMOVED
function findArrayIndex(obj, list) {
  for (let i = 0; i < list.length; i++) {
    let e = list[i];
    if (e[0].src === obj[0].src) {
      return i;
    }
  }
  return -1;
}

// findSpotId()
//
// Finds the digit placed in the spot id name in order to be used as the spot id
function findSpotId(itemId) {
  let spotId;
  if (itemId.length < 16) {
    spotId = itemId.charAt(itemId.length - 1);
  } else if (itemId.length > 15) {
    spotId = itemId.substring(itemId.length - 2, itemId.length);
  }
  return spotId;
}

// findSpotId()
//
// Finds the digit placed in the piece class name in order to be used as the piece id
function findPieceId(pieceId) {
  let droppedPieceId;
  if (pieceId.length < 16) {
    droppedPieceId = pieceId.charAt(5);
  } else if (pieceId.length > 15) {
    droppedPieceId = pieceId.substring(5, pieceId.length-3);
  }
  return droppedPieceId;
}
