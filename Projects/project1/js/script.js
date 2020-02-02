"use strict";

/********************************************************************

Clean the room game inspired by Sisyphus myth
Zahra Ahmadi

This is a game which will never have a winner. The purpose behind this game
is to drop all trashes in trash bin before time ends. However, the player can
never finish this task, because his time is limited.

Reference
- Background image:
https://photodune.net/item/rustic-wooden-board-texture-table-top-view/18736293
- Waste paper image:
https://pixabay.com/vectors/wastepaper-discard-trash-paper-97619/
- Trash bin:
https://pnghunter.com/png/recycle-bin-15/

Codes borrowed from:
- https://codepen.io/kaypooma/pen/tAfwm
- https://www.geeksforgeeks.org/how-to-change-the-background-image-using-jquery/

Sounds:
- https://freesound.org/people/DeantheDinosauce/sounds/177853/
*********************************************************************/

$(document).ready(setup);

let $allPapers = []; // Stores all papers
let newpapers = []; // Stores new paper id
const numPapers = 100; // Number of total papers
let paper; // Holds paper div
let paperName; // Sets new paper id name as the newly generated div
let $trashBin; // Stores trash bin image
let randPosX; // Stores random numebr for X position
let randPosY; // Stores random number for Y position
// Limiting papers display to the background area
let borderLeft;
let borderTop;
let borderBottom;
let seconds = 10; // Timer value
let intervalTime = 1000; // Interval time
let $playButton; //

// Paper crush sound
let paperCrushSFX = new Audio ("../assets/sounds/paper-crush.mp3");
// Throwing paper away sound
let throwingAwaySFX = new Audio ("../assets/sounds/throwing-paper-away.mp3");


// setup()
//
// Sets up everything
function setup() {

  // declare and assigns paper divs
  makePapers();
  // Sets paper properties + assigns functions to
  assignPapersProperties();

  // Assigns playbutton element to playButton variable
  $playButton = $('#playButton');
  // On click, runs startGame function
  $playButton.one("click", startGame);

  // Assigns trashBin element to trashBin variable
  $trashBin = $('#trashBin');
  // Makes trashBin a droppable variable
  $trashBin.droppable({
    drop: onDrop,
  });
  // Hides both trash bin and timer
  $trashBin.hide();
  $('#timer').hide();

}

// startGame()
//
// Displays game short description + start button
// On click, shows paper trashes + trash bin and the timer
function startGame() {
  // Hides play button
  $playButton.hide();
  // Hides description
  $('#gameDescription').hide();

  // Shows papers
  for (let i = 0; i < numPapers; i++) {
    $allPapers[i].show();
  }
  // Shows trash bin
  $trashBin.show();
  // shows timer
  $('#timer').show();
  // Decreases time by 1 per second
  setInterval(updateTime, intervalTime);
}

// makePapers
//
// Declare variables and assigns paper divs
// Gives specific attribute to each
// Append them to mainContainer div
function makePapers() {
  for (let i = 0; i < numPapers; i++) {
    newpapers[i] = `paper${i}`;
    paper = document.createElement('div');
    paperName = newpapers[i];
    paper.setAttribute('class', paperName);
    document.getElementById('mainContainer').appendChild(paper);
  }
}

// assignPapersProperties
//
// Assigns all papers to an array + Gives random position to + ....
function assignPapersProperties() {
  borderLeft = 730;
  borderBottom = 560;
  borderTop = 100;

  for (let i = 0; i < numPapers; i++) {
    // Generates random numbers
    let bodyWidth = $(window).width();
    let bodyHeight = $(window).height();
    randPosX = Math.floor((Math.random() * (bodyWidth - 65)));
    randPosY = Math.floor((Math.random() * (bodyHeight)));

    // Assigns new paper to the array
    $allPapers[i] = $(`.paper${i}`);

    // Checks if the paper is inside mainContainer div
    if (randPosX > borderLeft && randPosY < borderBottom && randPosY > borderTop) {
      $allPapers[i].offset({
        "top": randPosY,
        "left": randPosX
      });
    }

    // Sets paper properties
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

    // Hides them all
    $allPapers[i].hide();

    // Makes them all draggable
    $allPapers[i].draggable({
      containment: "parent",
      start: function () {
          paperCrushSFX.loop = true;
          paperCrushSFX.play();
        },
      stop: function () {
          paperCrushSFX.pause();
        }
    });
  }
}

// onDrop()
//
// On drop, removes the target paper
function onDrop(event, ui) {
  console.log("dropped!");
  for (let i = 0; i < numPapers; i++) {
    ui.draggable.remove();
    throwingAwaySFX.loop = false;
    throwingAwaySFX.play();
  }
}

// updateTime()
//
// Updates timer
function updateTime() {
  if (seconds > 0) {
    seconds -= 1;
    $('#seconds').text(seconds);
  } else {
    // If time became 0, hides everything and show help again button
    $trashBin.hide();
    $('#timer').hide();
    for (let i = 0; i < numPapers; i++) {
      $allPapers[i].hide();
    }
    seconds = 10;
    intervalTime = 1000;
    $playButton.text('Help Again!');
    $playButton.show();
    $playButton.one("click", startGame);
  }
}
