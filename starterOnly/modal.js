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
const checkboxCity = document.querySelectorAll(
  "input[name='location']:checked"
);
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

// FIXME
/*
const validNumberAndCheckboxCity = function (input) {
  const value = input.value;
  const regExpNumberTournament = /^[1-9]?[0-9]$/;
  if (!regExpNumberTournament.test(value)) {
    return "Veuillez entrer un nombre entre 0 et 99.";
  }
  if (value >= 1) {
    if (!checkboxCity) {
      hideButtonsRadio.style.display = "block";
      console.log("her");
      return "Veuillez choisir une ville";
    }
  } else {
    hideButtonsRadio.style.display = "none";
    return "";
  }
};
form.elements.quantity.addEventListener("change", function () {
  setErrorMessage(this, validNumberAndCheckboxCity(this));
});
*/

// =========================================================
// Fonctions de validation
// =========================================================

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

function validateEmail(input) {
  const value = input.value;
  const emailRegExp = /^[^@]+@[^@]+\.[^@]+$/;

  if (!emailRegExp.test(value)) {
    return "Veuillez entrez un email valide.";
  }
  return "";
}

function validateBirthdate(input) {
  const value = input.value;
  const birthdateRegExp = /^[0-9]{4}\\[0-9]{2}\\[0-9]{2}$/;
  if (birthdateRegExp.test(value)) {
    return "Veuillez entrer une date valide.";
  }
  return "";
}

function validateConditionChecked(input) {
  if (!input.checked) {
    return "Veuillez acceptez les termes et conditions.";
  }
  return "";
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

// =========================================================
// Validation du formulaire
// =========================================================

// Définition des inputs
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

// Ajouter la validation dynamique pour chaque input
for (const { input, validateFn } of formInputs) {
  input.addEventListener("change", function () {
    setErrorMessage(input, validateFn(input));
  });
}

// Écouter l'event submit du formulaire
form.addEventListener("submit", function (e) {
  // Annuler le comportement par défaut (envoi du formulaire)
  e.preventDefault();

  // Valider les inputs et compter le nombre d'erreurs
  let errorCount = 0;
  for (const { input, validateFn } of formInputs) {
    const error = validateFn(input);
    setErrorMessage(input, error);
    if (error) {
      errorCount++;
    }
  }

  // Si il n'y a aucune erreur, afficher le message de succès
  if (errorCount === 0) {
    form.remove();
    document.getElementById("formSuccessMessage").style.display = "flex";
  }
});
