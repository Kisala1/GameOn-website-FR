function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeForm = document.querySelectorAll('.close');
const firtName = document.querySelectorAll('.first');
const lastName = document.querySelectorAll('.last');
const textControl = document.querySelectorAll('.text-control');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// to close form 
closeForm.forEach ((close) => close.addEventListener('click', toCloseForm));
function toCloseForm() {
    modalbg.style.display = "none";
  }

