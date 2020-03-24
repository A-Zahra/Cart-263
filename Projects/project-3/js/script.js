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
      "width": "8vw",
      "padding": "8px"
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
        "opacity": "0.1"
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
    // Gets the spot id
    let itemId = $(this).attr("id");
    console.log(itemId);

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

      // If the spot id is single digit, takes only the last charater of the id
      // Else, takes the last two character
      let spotId;
      if (itemId.length < 16) {
        spotId = itemId.charAt(itemId.length - 1);
      } else if (itemId.length > 15) {
        spotId = itemId.substring(itemId.length - 2, itemId.length);
      }

      // SABINE EDITS START:
      // Makes a copy ..
      // Removes the other ...
      let droppedOne = $('<img>').addClass(`droppedPiece${spotId}`).css({
        "width": "100%"
      }).attr('src', ui.draggable[0].src).appendTo($(this));
      console.log((ui.draggable[0]).src);
      $(`.hidingLayer${spotId}`).remove();

      // Removes everyone up ...
      $(ui.draggable[0]).parent().remove();

      //SABINE: also needs to ensure that the correct ones are showing
      let slides = $(".slideC");

      // SHOWS THE FIRST FOUR ..
      for (let j = 0; j <= 3; j++) {
        $(slides[j]).show();
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
