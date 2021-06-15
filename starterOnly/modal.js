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

// FIXME
//const hideButtonsRadio = document.querySelector(".hide");
//const value = input.value;
//const regExpNumberTournament = /^[1-9]?[0-9]$/;
/*if (!regExpNumberTournament.test(value)) {
  return "Veuillez entrer un nombre entre 0 et 99.";
}*/

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

// =========================================================
// Validation du formulaire
// =========================================================

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

function addFormValidation(form, formInputs) {
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
    input: form.elements.checkbox1,
    validateFn: validateConditionChecked,
  },
]);
