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
const form = document.querySelector("#form");
const formData = document.querySelectorAll(".formData");
const closeForm = document.querySelectorAll(".close");
const buttonCloseFormSuccess = document.querySelector("#buttonCloseFormSuccess");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// to close form
closeForm.forEach((close) => close.addEventListener("click", toCloseForm));
function toCloseForm() {
  modalbg.style.display = "none";
}

modalbg.addEventListener("click", (event) => {
  if (event.target === modalbg) {
    toCloseForm();
  }
});

buttonCloseFormSuccess.addEventListener("click", toCloseForm);

/****************Validation Input Form****************************/

function registerCheck(input, checkFunction) {
  const check = () => input.setCustomValidity(checkFunction(input));
  input.addEventListener("change", check);
  input.addEventListener("input", check);
  check();
}


// Input first & last name

const validName = function(input) {
  const value = input.value;
  if (value.length < 2) {
    const messageError = document.createElement("span");
    formData.appendChild("messageError");
    messageError.setAttribute("name", "data-error");
    messageError.innerHTML = "Veuillez entrer 2 caractères ou plus.";
  }
  if (value.length > 25) {
    return "Veuillez entrer 25 caractères ou moins.";
  }
  const nameRegExp = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF '-]+$/;
  if (!nameRegExp.test(value)) {
    return "Veuillez n'entrer que des lettres, apostrophes ou tirets.";
  }
  return "";
};

form.elements.first.addEventListener("change", function () {
  this.setCustomValidity(validName(this));
});

form.elements.last.addEventListener("change", function () {
  this.setCustomValidity(validName(this));
});

// Input email

const validEmail = function (input) {
  const value = input.value;
  let emailRegExp = /^[^@]+@[^@]+\.[^@]+$/;

  if (!emailRegExp.test(value)) {
    return "Veuillez entrez un email valide.";
  }
  return "";
};

form.elements.email.addEventListener("change", function () {
  this.setCustomValidity(validEmail(this));
});

// Date

const validBirthdate = function (input) {
  const value = input.value;
  const birthdateRegExp = /^[0-9]{4}\\[0-9]{2}\\[0-9]{2}$/;
  if (birthdateRegExp.test(value)) {
    return "Veuillez entrer une date valide.";
  }
  return "";
};
form.elements.birthdate.addEventListener("change", function () {
  this.setCustomValidity(validBirthdate(this));
});

// Input quantity + Checkbox

// Conditions

function checked() {
  let conditionChecked = document.querySelector("#checkbox1");

  if (!conditionChecked.checked) {
    return "Veuillez acceptez les termes et conditions.";
  }
}

// form valid
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("FORM SUBMITED!");
  form.remove();
  document.getElementById("formSuccessMessage").style.display = "block";
});
