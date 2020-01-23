"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let $spans;
let secretsFound = 0;
let secretsTotal;
function setup() {
  setInterval(update, 1000);
  $spans = $('span');
  $spans.on("click", spanClicked);
  secretsTotal = $('.secret').length;
 $('#totalSecret').text(secretsTotal);

}

function update() {
  $spans.each(updateSpan);
}

function updateSpan() {
  let randomNum = Math.random();
  if (randomNum < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked() {
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}


