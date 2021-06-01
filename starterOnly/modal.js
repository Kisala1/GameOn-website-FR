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
const closeForm = document.querySelectorAll(".close");
const buttonCloseFormSuccess = document.querySelector(
  "#buttonCloseFormSuccess"
);
const checkboxCity = document.querySelectorAll("#location1");

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

function setErrorMessage(input, error) {
  const formData = input.closest('.formData');
  if (error) {
    formData.setAttribute('data-error', error);
    formData.setAttribute('data-error-visible', 'true');
  } else {
    formData.removeAttribute('data-error');
    formData.removeAttribute('data-error-visible');
  }
}

// Input first & last name

const validName = function (input) {
  const value = input.value;
  if (value.length < 2) {
    return "Veuillez entrer 2 caractères ou plus.";
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
  setErrorMessage(this, validName(this));
});

form.elements.last.addEventListener("change", function () {
  setErrorMessage(this, validName(this));
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
  setErrorMessage(this, validEmail(this));
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
  setErrorMessage(this, validBirthdate(this));
});

// Input quantity + Checkbox

const validNombreTournois = function (input) {
  const value = input.value;
  const regExpNombreTournois = /^[1-9]?[0-9]$/;
  if (!regExpNombreTournois.test(value)) {
    return "Veuillez entrer un nombre entre 0 et 99.";
  }
  return "";
};

function linkCheckboxCityAndNombreTournois() {
  if (validNombreTournois.value >= 1) {
    console.log("tre");
    return typeof value;
    if (checkboxCity.checked) {
      return "Veuillez sélectionner une ville.";
    }
  } else if (
    (checkboxCity.checked && validNombreTournois.value == 0) ||
    validNombreTournois.length == 0
  ) {
    return "Veuillez entrer un nombre.";
  }
}
form.elements.quantity.addEventListener("change", function () {
  setErrorMessage(this, validNombreTournois(this));
});

// Conditions

function checked() {
  const conditionChecked = document.querySelector("#checkbox1");

  if (!conditionChecked.checked) {
    return "Veuillez acceptez les termes et conditions.";
  }
  return "";
}
form.elements.checkbox1.addEventListener("change", function () {
  setErrorMessage(this, checked(this));
});

// form valid
form.addEventListener("submit", function (e) {
  e.preventDefault();
  form.remove();
  document.getElementById("formSuccessMessage").style.display = "flex";
});
