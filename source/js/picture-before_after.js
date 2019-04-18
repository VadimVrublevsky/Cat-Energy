var buttonBefore = document.querySelector(".picture__slider-status--before");
var buttonAfter = document.querySelector(".picture__slider-status--after");
var pictureBefore = document.querySelector(".picture__before");
var pictureAfter = document.querySelector(".picture__after");
var greenLine = document.querySelector(".picture__bar-toggle");

pictureAfter.classList.remove("picture__width-nojs");
pictureBefore.classList.remove("picture__width-nojs");
pictureAfter.classList.add("picture__width0");
pictureBefore.classList.add("picture__width100");

buttonBefore.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(pictureAfter.classList.contains("picture__width100")) {
      pictureAfter.classList.remove("picture__width100");
      pictureAfter.classList.add("picture__width0");
      pictureBefore.classList.add("picture__width100");
      pictureBefore.classList.remove("picture__width0");
      greenLine.classList.remove("picture__bar-toggle-float");
    }
});

buttonAfter.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(pictureBefore.classList.contains("picture__width100")) {
      pictureBefore.classList.remove("picture__width100");
      pictureBefore.classList.add("picture__width0");
      pictureAfter.classList.add("picture__width100");
      pictureAfter.classList.remove("picture__width0");
      greenLine.classList.add("picture__bar-toggle-float");
    }
});
