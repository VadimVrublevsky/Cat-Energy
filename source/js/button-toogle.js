var navMain = document.querySelector(".header-nav");
var navToggle = document.querySelector(".header-page__toogle");

navMain.classList.remove("header-nav--nojs");

navToggle.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(navMain.classList.contains("header-nav--closed")) {
      navMain.classList.remove("header-nav--closed");
      navMain.classList.add("header-nav--opened");
    }
    else {
      navMain.classList.remove("header-nav--opened");
      navMain.classList.add("header-nav--closed");
    }
});
