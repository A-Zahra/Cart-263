"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);

let $allPapers = [];
let newpapers = [];
const numPapers = 450;
let paper;
let paperName;
let $trashBin;
let randPosX;
let randPosY;
let randPosRight;

// setup()
//
// Sets up everything
function setup() {
  // Create div elements + sets their attribute name +
  // Append them to mainContainer div + Assign them to an array
  for (let i=0; i < numPapers; i++) {
    newpapers[i] = `paper${i}`;
    paper = document.createElement('div');
    paperName = newpapers[i];
    paper.setAttribute('class', paperName);
    document.getElementById('mainContainer').appendChild(paper);
    }

  //
  for (let i = 0; i < numPapers; i++){
    let bodyWidth = $(window).width();
    let bodyHeight = $(window).height();
    randPosX = Math.floor((Math.random()*(bodyWidth - 80)));
    randPosRight = Math.floor((Math.random()*(bodyWidth / 40)));
    randPosY = Math.floor((Math.random()*(bodyHeight / 1.1)));

    $allPapers[i] = $(`.paper${i}`);
    if (randPosX > 320 && randPosY < 500 && randPosY > 20){
    $allPapers[i].offset({ "top": randPosY, "left": randPosX});
}
    let imageUrl = "../assets/images/wastepaper.png";
    $allPapers[i].css({
      "background-image": "url(" + imageUrl + ")",
      "width": "100px",
      "height": "100px",
      "position": "absolute",
      "background-position": "center center",
      "background-repeat": "round",
      "background-size": "cover",
      "z-index": "0"
    });

    $allPapers[i].draggable({ containment: "parent"});
    $allPapers[i].insertBefore( "#trashBin" );
  }


  $trashBin = $('#trashBin');
  $trashBin.droppable({
      drop: onDrop,
    });

}

// onDrop()
//
// On drop removes the target paper
function onDrop(event, ui) {
  console.log("dropped!");
  for (let i = 0; i < numPapers; i++){
    ui.draggable.remove();
  }
}

// let myWindow;
//
// function openWin() {
//   myWindow = window.open("", "", "width=100, height=100");
// }
//
// function resizeWin() {
//   myWindow.resizeTo(250, 250);
//   myWindow.focus();
// }
//
