"use strict";

/********************************************************************
Assignment 1
Zahra Ahmadi

*********************************************************************/

window.onload = setup;

// Variable which holds the value for rotation
let rotation = 0;
// Assemble all pixels in one array so that I can rotate them all to gether
let allPixels = [];

// setup()
//
// Sets up all new properties of html file elements
function setup() {
  // A for loop which generates 1000 pixels
  for (let i = 0; i < 1000; i++) {
    // Calls the div element from Html file and assign it to a variable
    let pixel = document.createElement('div');
    // Gives pixel variable a class name
    pixel.setAttribute('class', 'pixel');
    // Add the new div called pixel to the body
    document.body.appendChild(pixel);
    // Also adds it to the array
    allPixels[i] = pixel;
    // Changes div color once mouse is over
    pixel.addEventListener('mouseover', paint);
    // Set div opacity to 0 once mouse is clicked
    pixel.addEventListener('click', remove);
    // Rotates div left or right once left or right arrow key is pressed
    document.addEventListener('keydown', rotate);
  }
}

// paint()
// Sets random colors for the pixel
function paint(e) {
  let pixel = e.target;
  let r = Math.random() * 255;
  let g = Math.random() * 10;
  let b = Math.random() * 10;
  pixel.style.backgroundColor = `rgb(${r},${g},${b})`;
  // Resets pixel color to black after a second
  setTimeout(resetPixel, 1000, pixel);
}

// resetPixel()
// Sets pixel color to black
function resetPixel(pixel) {
  pixel.style.backgroundColor = 'black';
}

// remove()
// Sets pixel opacity to Zero
function remove(e) {
  let pixel = e.target;
  let randomOpacity = 0;
  pixel.style.opacity = randomOpacity;
}

// rotate()
// rotates pixel to left or right once left or right arrow key is pressed
function rotate(e) {
  // Right rotation
  if (e.keyCode === 39) {
    // Adds one to rotation degree
    rotation += 1;
    for (let i = 0; i < 1000; i++) {
      allPixels[i].style.transform = "rotate(" + rotation + "deg)";
      // Assigns a new color to the pixel
      let r = Math.random() * 10;
      let g = Math.random() * 10;
      let b = Math.random() * 255;
      allPixels[i].style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  }
  // Left rotation
  else if (e.keyCode === 37) {
    // Lowers rotation degree by 1 
    rotation += -1;
    for (let i = 0; i < 1000; i++) {
      allPixels[i].style.transform = "rotate(" + rotation + "deg)";
      // Assigns a new color to the pixel
      let r = Math.random() * 10;
      let g = Math.random() * 255;
      let b = Math.random() * 10;
      allPixels[i].style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  }
}