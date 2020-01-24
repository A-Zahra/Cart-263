"use strict";

/********************************************************************

Raving Redactionist Redux
Zahra Ahmadi

The purpose behind this program is to keep redacting specified phrases 
and find the six words embedded in the paraghraphs. Total number 
of secret words plus number of words found by the user is shown on 
top left corner of the canvas.

*********************************************************************/
$(document).ready(setup);

let $spans; // Stores all spans
let secretsFound = 0; // Stores number of secrets counted
let secretsTotal; //

// setup()
//
// Sets up all the properties related to html file elements
function setup() {
  // Displays update function every second
  setInterval(update, 1000);
  // Assigns spans to the span variable
  $spans = $('span');
  // Applies spanClicked function to the spans once mouse clicked
  $spans.on("click", spanClicked);
  // Stores number of secret words
  secretsTotal = $('.secret').length;
  // Assigns total number of secrets to totalSecret
  $('#totalSecret').text(secretsTotal);
  // If mouse went over secret word, applies foundIt function to 
  $('.secret').on("mouseover", foundIt);
}

// update()
//
// Applies updateSpan function to each secret word
function update() {
  $spans.each(updateSpan);
}

// updateSpan()
//
// Randomly reveals redacted phrases
function updateSpan() {
  let randomNum = Math.random();
  if (randomNum < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

// spanClicked()
//
// If the phrase got clicked , redacts it again
function spanClicked() {
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}

// foundIt()
//
// If mouse went over the secret word, adds found class to it
function foundIt() {
  $(this).addClass("found");
  // Adds one to the number of found secrets
  secretsFound += 1;
  $('#foundSecret').text(secretsFound);
  // Removes mouseover from that word
  $(this).off("mouseover");
}