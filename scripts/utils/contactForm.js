const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal");

const getUrl = window.location.search;
const searchParams = new URLSearchParams(getUrl);
const photographId = parseInt(searchParams.get("id"));

const displayModal = () => {
  modal.style.display = "block";
  modalContent.focus();
};

const closeModal = () => {
  modal.style.display = "none";
};

// form verification
const formVerification = () => {
  const form = document.getElementById("form_contact");
  const formInput = document.querySelectorAll(".form_input");

  formInput.forEach((input) => {
    input.addEventListener("keyup", () => checkInput(input));
    input.addEventListener("change", () => checkInput(input));
  });

  form.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
    let isValid = true;
    for (let input of formInput) {
      if (!checkInput(input)) {
        isValid = false;
      }
    }
    formValidation(isValid);
  });
};

const checkInput = (input) => {
  let regexp = null;
  let isValid = null;

  if (input.name != "email") {
    regexp = /^[A-Za-z-]{2,}$/;
  } else if (input.name == "email") {
    regexp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  isValid = regexp && regexp.test(input.value) ? true : false;

  if (isValid) {
    input.dataset.errorVisible = false;
  } else {
    input.dataset.errorVisible = true;
  }

  return isValid;
};

const formValidation = (isValid) => {
  console.log(isValid);
};

const tabFocusFormContact = (event) => {
  const lastElementForm = document.querySelector(".submit_contact");
  if (event.key === "Tab") {
    if (!event.shiftKey && document.activeElement === lastElementForm) {
      event.preventDefault();
      modalContent.focus();
    }
  }
};

const initContactForm = () => {
  const btnDisplayModal = document.querySelector(".contact_me");
  const btnCloseModal = document.querySelector(".contact_close");

  btnDisplayModal.addEventListener("click", () => displayModal());
  btnCloseModal.addEventListener("click", () => closeModal());
  modalContent.addEventListener("keydown", (event) => tabFocusFormContact(event));

  formVerification();
};

initContactForm();
