"use strict";

/********************************************************************
Project3 - Jigsaw puzzles
Zahra Ahmadi

Reference
********************************************************************/
$(document).ready(setup);
  let puzzle2Id = "";

// Sets up everything
function setup() {
  let puzzle1Id = "";

  // Introduction page
  introScreen();

  /* Displays the intro screen */
  function introScreen() {
    console.log("intro");
    let introduction = $('<h1></h1>').addClass("gameTitle").text("Jigsaw Puzzle Game").appendTo('.introduction').after($('.gameLevels'));
    $('.model1Title').on("click", puzzleModel1);
    $('.model2Title').on("click", puzzleModel2);
  }

  // Once the model1 is clicked..
  function puzzleModel1() {
    // Hides the gameLevels div content..
    console.log("worked");
    $('.gameLevels').css({
      "display": "none"
    });
    // Displays Model1 window including options
    $('.level1Options').css({
      "display": "table"
    });
    // Model1 window exit button
    $('.windowExitButton').on('click', function() {
      $('.level1Options').hide();
      $('.gameLevels').show();
    });

    // Once the player clicked on one of the options...
    // Gets the option id and send it through the local storage
    $('#colorful').click(function() {
      console.log(this.id);
      puzzle1Id = $(this).attr("id");
      localStorage.setItem('puzzle1Id', puzzle1Id);
      window.location.href = "modelOne.html";
    });

    $('#shiraz').click(function() {
      console.log(this.id);
      puzzle1Id = $(this).attr("id");
      localStorage.setItem('puzzle1Id', puzzle1Id);
      window.location.href = "modelOne.html";
    });

    $('#spring').click(function() {
      console.log(this.id);
      puzzle1Id = $(this).attr("id");
      localStorage.setItem('puzzle1Id', puzzle1Id);
      window.location.href = "modelOne.html";
    });

    $('#food').click(function() {
      console.log(this.id);
      puzzle1Id = $(this).attr("id");
      localStorage.setItem('puzzle1Id', puzzle1Id);
      window.location.href = "modelOne.html";
    });
  }
}

// Once the model1 is clicked..
function puzzleModel2() {
  // Hides the gameLevels div content..
  console.log("worked");
  $('.gameLevels').css({
    "display": "none"
  });
  // Displays Model1 window including options
  $('.level2Options').css({
    "display": "table"
  });
  // Model1 window exit button
  $('.windowExitButton').on('click', function() {
    $('.level2Options').hide();
    $('.gameLevels').show();
  });

  // Once the player clicked on one of the options...
  // Gets the option id and send it through the local storage
  $('#desert').click(function() {
    
    puzzle2Id = $(this).attr("id");
    console.log(puzzle2Id);
    localStorage.setItem('puzzle2Id', puzzle2Id);
    window.location.href = "modelTwo.html";
  });

  $('#strawberry').click(function() {
    console.log(this.id);
    puzzle2Id = $(this).attr("id");
    localStorage.setItem('puzzle2Id', puzzle2Id);
    window.location.href = "modelTwo.html";
  });

  // $('#spring').click(function() {
  //   console.log(this.id);
  //   puzzle1Id = $(this).attr("id");
  //   localStorage.setItem('puzzle1Id', puzzle1Id);
  //   window.location.href = "modelOne.html";
  // });
  // 
  // $('#food').click(function() {
  //   console.log(this.id);
  //   puzzle1Id = $(this).attr("id");
  //   localStorage.setItem('puzzle1Id', puzzle1Id);
  //   window.location.href = "modelOne.html";
  // });
// }
}