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
const numPapers = 600;
let paper;
let paperName;
let $trashBin;
let randPosX;
let randPosY;
let randPosRight;
let seconds = 10;
let intervalTime = 1000;
let timeOver = true;
let gameOverScreen;
let startScreen = true;
let $startMessage;

// setup()
//
// Sets up everything
function setup() {

    makePapers();
    assignPapersProperties();

    $startMessage = $('#playButton');
    $startMessage.one("click", startGame);

    $trashBin = $('#trashBin');
    $trashBin.droppable({
      drop: onDrop,
    });

    $trashBin.hide();
    $('#timer').hide();


}

function startGame() {
  console.log("worked!");
  timeOver = false;
  $startMessage.hide();

    for (let i=0; i < numPapers; i++){
      $allPapers[i].show();
    }
      $trashBin.show();
      $('#timer').show();
      setInterval(updateTime, intervalTime);
}

function makePapers() {
  // Create div elements + sets their attribute name +
  // Append them to mainContainer div + Assign them to an array
  for (let i = 0; i < numPapers; i++) {
    newpapers[i] = `paper${i}`;
    paper = document.createElement('div');
    paperName = newpapers[i];
    paper.setAttribute('class', paperName);
    document.getElementById('mainContainer').appendChild(paper);
  }
}

function assignPapersProperties() {

  for (let i = 0; i < numPapers; i++) {
    let bodyWidth = $(window).width();
    let bodyHeight = $(window).height();
    randPosX = Math.floor((Math.random() * (bodyWidth - 65)));
    randPosRight = Math.floor((Math.random() * (bodyWidth / 40)));
    randPosY = Math.floor((Math.random() * (bodyHeight)));

    $allPapers[i] = $(`.paper${i}`);
    if (randPosX > 730 && randPosY < 570 && randPosY > 100) {
      $allPapers[i].offset({
        "top": randPosY,
        "left": randPosX
      });
    }

    let imageUrl = "../assets/images/wastepaper.png";
    $allPapers[i].css({
      "background-image": "url(" + imageUrl + ")",
      "width": "70px",
      "height": "70px",
      "position": "absolute",
      "background-position": "center center",
      "background-repeat": "round",
      "background-size": "cover"
    });
    $allPapers[i].hide();

    $allPapers[i].draggable({
      containment: "parent"
    });
    // $allPapers[i].insertBefore("#trashBin");

    }
}



// onDrop()
//
// On drop removes the target paper
function onDrop(event, ui) {
  console.log("dropped!");
  for (let i = 0; i < numPapers; i++) {
    ui.draggable.remove();
  }
}

function updateTime() {
  if (seconds > 0) {
    seconds -= 1;
    $('#seconds').text(seconds);
  }
  else {
    $trashBin.hide();
    $('#timer').hide();
    for(let i = 0; i < numPapers; i++){
      $allPapers[i].hide();
    }

    $startMessage.text('Play Again!');
    $startMessage.show();
    $startMessage.one("click", startGame);
    seconds = 10;
    intervalTime =1000;
  }
}
