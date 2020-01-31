"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);
let $bar;
let $allBars = [];
let bar;
let allBars = [];
let newBars = [];
let barName;
let $trashBin;
let randPosX;
let randPosY;
function setup() {
  for (let i=0; i < 10; i++) {
    newBars[i] = `bar${i}`;
    bar = document.createElement('div');
    barName = newBars[i];
    bar.setAttribute('class', barName);
    console.log(bar);
    document.getElementById('mainContainer').appendChild(bar);
  }
  
  for (let i = 0; i < 10; i++){
    let bodyWidth = $(window).width();
    let bodyHeight = $(window).height();
    randPosX = Math.floor((Math.random()*(bodyWidth - 100)));
    randPosY = Math.floor((Math.random()*(bodyHeight/1.3)));
    $allBars[i] = $(`.bar${i}`);
    console.log(randPosY);
    let left = 10*i;
    $allBars[i].css({"background-color": "yellow", "width": "100px", "height": "100px", "position": "fixed"});
    $allBars[i].offset({ "top": randPosY, "left": randPosX});
    $allBars[i].draggable({ containment: "parent" });
  }
  // $bar = $('.bar0');
  // 
  // $bar.offset({ top: randPosY, left: randPosX});

  // $bar.css( "background-color", "yellow" );
    
  // $bar.draggable();
  $trashBin = $('#trashBin');
  $trashBin.droppable({
      drop: onDrop,
    });

}
// 
function onDrop(event, ui) {
  // let pos = ui.draggable.position();
  //   alert('top: ' + pos.to+ ', left: ' + pos.left);
  console.log("dropped!");
  for (let i = 0; i < 10; i++){
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
