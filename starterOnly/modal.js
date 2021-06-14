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
const topNav = document.querySelector(".topnav");
const form = document.querySelector("#form");
const closeForm = document.querySelectorAll(".close");
const buttonCloseFormSuccess = document.querySelector(
  "#buttonCloseFormSuccess"
);
const checkboxCity = document.querySelectorAll("input[name='location']");
const hideButtonsRadio = document.querySelector(".hide");

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

function registerInputValidation(input, validateFn) {
  input.addEventListener("change", function () {
    setErrorMessage(this, validateFn(this));
  });
}

function setErrorMessage(input, error) {
  const formData = input.closest(".formData");
  if (error) {
    formData.setAttribute("data-error", error);
    formData.setAttribute("data-error-visible", "true");
  } else {
    formData.removeAttribute("data-error");
    formData.removeAttribute("data-error-visible");
  }
}

// Input first & last name

function validateName(input) {
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
}

registerInputValidation(form.elements.first, validateName);
registerInputValidation(form.elements.last, validateName);

// Input email

function validateEmail(input) {
  const value = input.value;
  const emailRegExp = /^[^@]+@[^@]+\.[^@]+$/;

  if (!emailRegExp.test(value)) {
    return "Veuillez entrez un email valide.";
  }
  return "";
}

registerInputValidation(form.elements.email, validateEmail);

// Input Birthdate

function validateBirthdate(input) {
  const value = input.value;
  const birthdateRegExp = /^[0-9]{4}\\[0-9]{2}\\[0-9]{2}$/;
  if (birthdateRegExp.test(value)) {
    return "Veuillez entrer une date valide.";
  }
  return "";
}

registerInputValidation(form.elements.birthdate, validateBirthdate);

// Input quantity + Checkbox

const validNumberAndCheckboxCity = function (input) {
  const value = input.value;
  const regExpNumberTournament = /^[1-9]?[0-9]$/;
  if (!regExpNumberTournament.test(value)) {
    return "Veuillez entrer un nombre entre 0 et 99.";
  }
  if (value >= 1) {
    hideButtonsRadio.style.display = "block";
    if (!checkboxCity.checked) {
      return "Veuillez choisir une ville";
    }
    return "";
  } else {
    hideButtonsRadio.style.display = "none";
  }
};
checkboxCity.forEach((elem) => {
  elem.addEventListener("change", (event) => {
    var item = event.target.value;
    console.log(item);
  });
});

form.elements.quantity.addEventListener("change", function () {
  setErrorMessage(this, validNumberAndCheckboxCity(this));
});

// Conditions

function validateConditionChecked(input) {
  if (!input.checked) {
    return "Veuillez acceptez les termes et conditions.";
  }
  return "";
}

registerInputValidation(form.elements.checkbox1, validateConditionChecked);

// form valid

const formInputs = [
  {
    input: form.elements.first,
    validateFn: validateName,
  },
  {
    input: form.elements.last,
    validateFn: validateName,
  },
  {
    input: form.elements.email,
    validateFn: validateEmail,
  },
  {
    input: form.elements.birthdate,
    validateFn: validateBirthdate,
  },
  {
    input: form.elements.checkbox1,
    validateFn: validateConditionChecked,
  },
];

for (const { input, validateFn } of formInputs) {
  console.log("### FOR ###");
  console.log("input=", input);
  console.log("validateFn=", validateFn);
  input.addEventListener("change", function () {
    setErrorMessage(this, validateFn(this));
  });
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // TODO faire un recheck de tous les input avant de submit
  form.remove();
  document.getElementById("formSuccessMessage").style.display = "flex";
});
