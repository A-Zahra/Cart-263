"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let condimentSimileSentence;
$(document).ready(setup);




function setup() {
  $.getJSON("data/data.json")
    .done(dataLoaded)
    .fail(dataError);
    
    
}

function dataLoaded(data) {
  console.log(data);

  
  let randomCondiment = getRandomElement(data.condiments);
  // console.error(randomCondiment);
  
  let verb = "is";
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are";
  }
  
  let randomCats = getRandomElement(data.cats);
  // console.error(randomCats);
  
  let vowels = ["A", "E", "O", "U", "I"];
  let catArticle = "a";
  let catFirstCharacter = randomCats.charAt(0).toUpperCase();
  for (let i = 0; i < vowels.length; i++) {
    if (catFirstCharacter === vowels[i] ) {
      catArticle = "an";
    }
  }
  
  let randomRoom = getRandomElement(data.rooms);
  // console.error(randomRoom);
  
  let roomArticle = "a";
  for (let i = 0; i < vowels.length; i++) {
    let roomFirstCharacter = randomRoom.charAt(0).toUpperCase();
    if (roomFirstCharacter === vowels[i]) {
      roomArticle = "an";
    }
  }
  let container = $('<div></div>').attr('id', 'container');
  container.appendTo('body');
  let condimentSimile = `${randomCondiment} ${verb} like ${catArticle} ${randomCats} in ${roomArticle} ${randomRoom}.`;
  condimentSimileSentence = $('<p></p>').text(`${condimentSimile}`).attr('id', 'condimentSimile');
  condimentSimileSentence.appendTo('#container');
  $('#container').on("click", onClick);
    
}
 
 
  function dataError(request, textStatus, error) {
  console.error(error);
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;

}
function onClick () {
  $(this).remove();
  setup();
}