/**
 * Permet d'ajouter une class à myTopnav.
 *
 */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// =========================================================
// Modal
// =========================================================

/**
 * Permet de faire apparaître et fermer le formulaire.
 *
 * @param {HTMLElement} modalBg Div bground
 * @param {HTMLElement} launchBtns Button modal-btn
 * @param {HTMLElement} closeBtns Buttons : modalClose + btnCloseFormSuccess
 */
function addModal(modalBg, launchBtns, closeBtns) {
  function launchModal() {
    modalBg.style.display = "block";
  }
  function closeModal() {
    modalBg.style.display = "none";
  }

  modalBg.addEventListener("click", (event) => {
    if (event.target === modalBg) {
      closeModal();
    }
  });

  for (const btn of launchBtns) {
    btn.addEventListener("click", launchModal);
  }

  for (const btn of closeBtns) {
    btn.addEventListener("click", closeModal);
  }
}

const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const btnCloseFormSuccess = document.querySelector("#buttonCloseFormSuccess");
addModal(modalBg, modalBtn, [...modalClose, btnCloseFormSuccess]);

// =========================================================
// Fonctions de validation
// =========================================================

/**
 * Vérifie que l'input contient un prénom ou nom.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
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

/**
 * Vérifie que l'input contient un email.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateEmail(input) {
  const value = input.value;
  const emailRegExp = /^[^@]+@[^@]+\.[^@]+$/;

  if (!emailRegExp.test(value)) {
    return "Veuillez entrez un email valide.";
  }
  return "";
}

/**
 * Vérifie que l'input contient une date de naissance.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateBirthdate(input) {
  const value = input.value;
  const birthdateRegExp =
    /^[0-9]{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/;
  if (!birthdateRegExp.test(value)) {
    return "Veuillez entrer une date valide.";
  }
  return "";
}

/**
 * Vérifie que l'input contient une nombre valide.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateQuantity(input) {
  const value = input.value;
  const intValue = parseInt(value);
  if (isNaN(intValue) || intValue < 0 || intValue > 99) {
    return "Veuillez entrer une nombre valide.";
  }
  if (intValue === 0) {
    const hideButtonsRadio = document.querySelector(".hide");
    hideButtonsRadio.style.display = "none";
  }
  return "";
}

/**
 * Vérifie qu'un input soit coché si quantity a une valeur >= 1.
 *
 * @param {HTMLInputElement} input L'input
 * @param {HTMLInputElement} param1 L'input quantity
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateLocation(input, { quantityInput }) {
  const value = input.value;
  const valueQuantity = parseInt(quantityInput.value);
  if (valueQuantity >= 1 && value === "") {
    return "Veuillez sélectionner une ville.";
  }
  return "";
}

/**
 * Vérifie que l'input, "J'ai lu et accepté les conditions d'utilisation"
 * soit coché.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {string} le message d'erreur; ou une string vide en cas de succès.
 */
function validateConditionChecked(input) {
  if (!input.checked) {
    return "Veuillez acceptez les termes et conditions.";
  }
  return "";
}

// =========================================================
// Validation du formulaire
// =========================================================

/**
 * Transforme tous les inputs en un array.
 *
 * @param {HTMLInputElement} input L'input
 * @returns {Array}
 */
function inputToArray(input) {
  if (input.length !== undefined) {
    return [...input];
  } else {
    return [input];
  }
}

/**
 * Permet d'afficher le message d'erreur pour l'input.
 *
 * @param {HTMLInputElement|NodeList} input L'input
 * @param {string} error Message d'erreur ou une string vide
 */
function setErrorMessage(input, error) {
  const formData = inputToArray(input)[0].closest(".formData");
  if (error) {
    formData.setAttribute("data-error", error);
    formData.setAttribute("data-error-visible", "true");
  } else {
    formData.removeAttribute("data-error");
    formData.removeAttribute("data-error-visible");
  }
}
/**
 * Permet de faire la validation des inputs.
 *
 * @param {HTMLElement} form
 * @param {*} formInputs Array : input, validateFn, validateParams
 */
function addFormValidation(form, formInputs) {
  // Ajouter la validation dynamique pour chaque input
  for (const { input, validateFn, validateParams } of formInputs) {
    inputToArray(input).forEach(function (i) {
      i.addEventListener("change", function () {
        setErrorMessage(input, validateFn(input, validateParams));
      });
    });
  }

  // Écouter l'event submit du formulaire
  form.addEventListener("submit", function (e) {
    // Annuler le comportement par défaut (envoi du formulaire)
    e.preventDefault();

    // Valider les inputs et compter le nombre d'erreurs
    let errorCount = 0;
    for (const { input, validateFn, validateParams } of formInputs) {
      const error = validateFn(input, validateParams);
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
}

// Définition des inputs
const form = document.querySelector("#form");
addFormValidation(form, [
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
    input: form.elements.quantity,
    validateFn: validateQuantity,
  },
  {
    input: form.elements.location,
    validateFn: validateLocation,
    validateParams: { quantityInput: form.elements.quantity },
  },
  {
    input: form.elements.checkbox1,
    validateFn: validateConditionChecked,
  },
]);
