"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

window.onload = setup;
let rotation = 0;
let allPixels = [];
function setup() {
  console.log("hello, I am here!");
  for(let i = 0; i < 1000; i++){
    let pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    document.body.appendChild(pixel);
    allPixels[i] = pixel;
    pixel.addEventListener('mouseover', paint);
    pixel.addEventListener('click', remove);
    document.addEventListener('keydown', rotate);
  }
}

function paint(e) {
  let pixel = e.target;
  let r = Math.random() * 255;
  let g = Math.random() * 10;
  let b = Math.random() * 10;
  pixel.style.backgroundColor = `rgb(${r},${g},${b})`;
  // pixel.style.width = `${r}px`;
  // pixel.style.height = `${r}px`;
  setTimeout(resetPixel, 1000, pixel);
}

function resetPixel(pixel) {
  pixel.style.backgroundColor = 'black';
}

function remove(e) {
  let pixel = e.target;
  pixel.style.opacity = '0';
  console.log("worked!" + pixel);
}

function rotate(e) {
  console.log(e.keyCode);
  if (e.keyCode === 39) {
    rotation += 1;
    for (let i = 0; i < 1000; i++) {
    //  console.log(allPixels[i]);
      allPixels[i].style.transform = "rotate("+rotation+"deg)";
    }
  }
  else if (e.keyCode === 37) {
    rotation += -1;
    for (let i = 0; i < 1000; i++) {
    //  console.log(allPixels[i]);
      allPixels[i].style.transform = "rotate("+rotation+"deg)";
    }
  }
}
