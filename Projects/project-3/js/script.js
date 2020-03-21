"use strict";

/********************************************************************
Project3 - Jigsaw puzzles
Zahra Ahmadi



Reference

LightSlider:
http://sachinchoolur.github.io/lightslider/examples.html
*********************************************************************/
let puzzleScreen;
let puzzle1pieces;
let numSlides;
//let lastPiece = [];
//let notReversedPieces= [];
let piecesInSlide=[];
let movablePiece = 1;
let li;
let arrowright;
let arrowleft;
let pieceDropped;
let puzzlePiece;
let numShownPieces;
let numPieceShow;
$(document).ready(setup);

function setup(){
  $.getJSON("data/data.json")
    .done(dataLoaded) // If there is no error, runs dataLoaded function
    .fail(dataError); // otherwise, runs the dataError function

}

function dataLoaded(data) {
  firstPuzzle(data);
}

function firstPuzzle(data) {
  puzzleScreen = $('<img>').addClass('puzzleScreen').attr('src', `${data.puzzles.firstPuzzle.puzzleScreen}`).appendTo('#template-container');
  let ul = $('<ul></ul>').addClass('content-slider').appendTo('.item');
  arrowright = $('<img>').addClass('arrowright').attr('src','assets/images/arrowright.png').appendTo(`.content-slider`);
  pieces(data);
}

function goNext() {
  let slides = $(".slideC");
  let putATend= piecesInSlide[0];

  //move along
  for (let i = 0; i < piecesInSlide.length-1; i++) {
    piecesInSlide[i] = piecesInSlide[i+1];
    $(slides[i]).html(piecesInSlide[i]);
}
  //hide last

  piecesInSlide[piecesInSlide.length-1] = putATend;
  //need to remake it draggable
  piecesInSlide[piecesInSlide.length-1].draggable();
  $(slides[piecesInSlide.length-1]).html(piecesInSlide[piecesInSlide.length-1]);
}

function goPrev() {

let slides = $(".slideC");

  let firstPiece= piecesInSlide[piecesInSlide.length-1];

  for (let i = piecesInSlide.length-1; i >0; i--) {
    piecesInSlide[i] = piecesInSlide[i-1];
      $(slides[i]).html(piecesInSlide[i]);
  }

  piecesInSlide[0] = firstPiece;
  piecesInSlide[0].draggable();
  $(slides[0]).html(piecesInSlide[0]);


}
//SABINE EDIT
function pieces(data) {
  numSlides = data.puzzles.firstPuzzle.puzzlePieces.length;
  puzzle1pieces = data.puzzles.firstPuzzle.puzzlePieces;
  for(let i = 0; i < numSlides ; i++) {
      li = $('<li></li>').addClass(`slide${i}`).addClass("slideC").appendTo('.content-slider');
      let imgAddress = data.puzzles.firstPuzzle.puzzlePieces[i];

      puzzlePiece = $('<img>').addClass(`piece${i}Img`).css({"width":"8vw","padding": "2px"}).attr('src',`${imgAddress}`).appendTo(`.slide${i}`);
      puzzlePiece.draggable();
      //puzzleScreen.droppable();
      //SABINE:: need to capture which piece was just dropped ...

      //push the ENTIRE OBJECT...  ...
      piecesInSlide.push(puzzlePiece);
      puzzleScreen.droppable({
      drop: onDrop
    });

    if (i >3){
      $(`.slide${i}`).hide();
   }
  }

  arrowleft = $('<img>').addClass('arrowleft').attr('src','assets/images/arrowleft.png').appendTo(`.content-slider`);
  arrowright.on('click', goNext);
  arrowleft.on('click', goPrev);


}

function onDrop( event, ui ) {
  //the one we dropped AND CHECK THAT IT IS NOT ONE ALREADY DROPPED ...
  let classNameOfParent = $(ui.draggable[0]).parent().attr('class');
  //console.log($(ui.draggable[0]).parent().attr('class'))


  if(classNameOfParent.includes("slideC")){


//CUSTOM FUNCTION TO REMOVE FROM THE ARRAY (BASED ON THE SRC OF THE IMAGE)
  let indexToRemove = findArrayIndex(ui.draggable,piecesInSlide);
  piecesInSlide.splice(indexToRemove,1);


  let r = ui.draggable[0].getBoundingClientRect();

    //make a copy ..
    //remove the other ...
    let droppedOne = $('<img>').addClass(`pieceAImg`).css({"width":"18vw","position":"absolute","left":r.x+"px","top":r.y+"px","z-index":10}).attr('src',ui.draggable[0].src).appendTo(".main-container");
   console.log((ui.draggable[0]).src);

    //SABINE:
    $(droppedOne).draggable();

    // remove everyone up ...
    $(ui.draggable[0]).parent().remove();

    //SABINE:: also need to ensure that the correct ones are showing
    let slides = $(".slideC");

    //SHOW THE FIRST FOUR ..
    for( let j=0; j<=3; j++)
    {
      $(slides[j]).show();
    }
  }
  else {
    console.log("not in list and is a different type of droppable");
  }
    /*debug
    for(let i =0; i<lastPiece.length;i++){
      console.log(lastPiece[i]);
    }*/
}

// dataError
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}

//HELPER FUNCTION MADE BY SABINE...
function findArrayIndex(obj, list) {

    for (let i = 0; i < list.length; i++) {

        let e = list[i];
        if (e[0].src === obj[0].src) {
            return i;
        }
    }

    return -1;
}
