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
const firstName = document.querySelector("#first");

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

/****************Validation Input Form****************************/

// Input first name

firstName.addEventListener("change", function () {
  validFirstName(this);
});
const validFirstName = function (inputFirst) {
  let firstRegExp = /^[a-zàäâçèéëîïôöùûüÿ'-]+$/i;

  if (inputFirst.validity.valueMissing || inputFirst.value.length < 2) {
    inputFirst.setCustomValidity(
      "Veuillez entrer 2 caractères ou plus pour le champ prénom."
    );
  } else if (inputFirst.value.length > 25) {
    inputFirst.setCustomValidity("Il y a trop de caractères.");
  } else if (firstRegExp.test(inputFirst.value) == false) {
    inputFirst.setCustomValidity("Caractère non valide.");
  }
};

// Input last name

form.lastChild.addEventListener("change", function () {
  validLastName(this);
});

const validLastName = function (inputLast) {
  let lastRegExp = /^[a-zàäâçèéëîïôöùûüÿ'-\s]+$/i;
  if (inputLast.value.length < 2 || inputFirst.validity.valueMissing) {
    inputLast.setCustomValidity(
      "Veuillez entrer 2 caractères ou plus pour le champ nom."
    );
  } else if (inputLast.value.length > 25) {
    inputLast.setCustomValidity("Il y a trop de caractères.");
  } else if (lastRegExp.test(inputLast.value) == false) {
    inputLast.setCustomValidity("Caractère non valide.");
  }
};

// Input email
form.email.addEventListener("click", function () {
  validEmail(this);
});
const validEmail = function (inputEmail) {
  let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$/g;

  if (emailRegExp.test(inputEmail.value)) {
    inputEmail.setCustomValidity("Adresse valide.");
  } else {
    inputEmail.setCustomValidity("Adresse non valide.");
  }
};

// Date
form.birthdate.addEventListener("click", function () {
  validBirthdate(this);
});
const validBirthdate = function (inputBirthdate) {
  let birthdateRegExp = /^[0-9]{2}\\[0-9]{2}\\[0-9]{4}$/g;
  if (birthdateRegExp.test(inputBirthdate.value)) {
    inputBirthdate.setCustomValidity("Date valide");
  } else {
    inputBirthdate.setCustomValidity("Date non valide");
  }
};

// City + Checkbox
form.quantity.addEventListener("click", function () {
  validQuantity(this);
});
const validQuantity = function (inputQuantity) {
  let quantityRegExp = /^[0-9]/g;
  let cityChecked = document.querySelectorAll("checkbox-input");
  if (quantityRegExp.test(inputQuantity.value < 0)) {
    cityChecked.checked == true;
  } else if (
    quantityRegExp.test(inputQuantity.value < 0) &&
    cityChecked.checked == false
  ) {
    cityChecked.setCustomValidity("Vous devez cocher au moins une ville.");
  }
};

// Conditions
function checked() {
  let conditionChecked = document.querySelector("#checkbox1");

  if (conditionChecked.checked == false) {
    conditionChecked.setCustomValidity(
      "Vous devez cocher cette case si vous voulez vous inscrire."
    );
  }
}

// form valid
form.button.addEventListener("onsubmit", function (e) {});
