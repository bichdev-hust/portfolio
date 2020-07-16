const blogSlider = document.querySelector(".blog__slider");
var containerWidth = blogSlider.offsetWidth;
// console.log(widthBlogSlider);

const sliderContainer = document.querySelector(".slider-content");
// const sliderItem = document.querySelectorAll(".slider__item");
const sliderItem = sliderContainer.children;
// var containerWidth = sliderContainer.offsetWidth;

const prev = document.querySelector(".slider-prev");
const next = document.querySelector(".slider-next");

const margin = 15;
var items = 0;
var index = 1;

// setup item per slide
responsive = [
  {breakpoint: {width: 0, item: 1}},
  {breakpoint: {width: 600, item: 2}},
  {breakpoint: {width: 900, item: 3}}
]

function load() {
  //set lai width hien thi slider moi lan brower thay doi kich thuoc
  containerWidth = blogSlider.offsetWidth;
  
  //set lai so item hien thi tren slider
  for (let i = 0; i < responsive.length; i++) {
    if (containerWidth > responsive[i].breakpoint.width) {
      items = responsive[i].breakpoint.item;
    }
  }
  start();
}

function start() {
  var widthSlider = 0;
  for (let i = 0; i < sliderItem.length; i++) {
    //gan width va margin cho moi item
    sliderItem[i].style.margin = 15 + "px";
    sliderItem[i].style.width = (containerWidth / items - 30) + "px";
    widthSlider += (containerWidth / items) + 30;
  }

  sliderContainer.style.width = widthSlider + "px";
}


function sliderMove(bool) {
  // kich thuoc 1 khung dich chuyen
  var widthMove = -1 * (containerWidth / items);

  if (bool && (index <= sliderItem.length - items)) {
    sliderContainer.style.marginLeft = (index * widthMove) + "px";
    index++;
    console.log(index);
  }

  if (!bool && (index > 1)) {
    index--;
    sliderContainer.style.marginLeft = (widthMove * (index - 1)) + "px";
  }
}

window.onload = load();
window.onresize = load;
// $(window).resize(function() {
//   load();
//   console.log(1);
// });