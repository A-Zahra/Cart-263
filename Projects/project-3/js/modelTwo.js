"use strict";

/********************************************************************
Project3 - Jigsaw puzzles
Zahra Ahmadi

Reference
********************************************************************/

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
  
}

// dataError()
//
// If there is an error...
function dataError(request, textStatus, error) {
  // Displays the error on console
  console.error(error);
}
