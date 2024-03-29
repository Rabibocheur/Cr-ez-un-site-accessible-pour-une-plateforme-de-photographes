import { getProfilePhotograph } from "../api/getAPI.js";

const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal");

const displayModal = () => {
  modal.style.display = "block";
  modalContent.focus();
};

const closeModal = () => {
  modal.style.display = "none";
};

const formVerification = () => {
  const form = document.getElementById("form_contact");
  const formInput = document.querySelectorAll(".form_input");

  formInput.forEach((input) => {
    input.addEventListener("keyup", () => checkInput(input));
    input.addEventListener("change", () => checkInput(input));
  });

  let inputValues = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let input of formInput) {
      inputValues.push(input.value);
      if (!checkInput(input)) {
        inputValues = [];
        throw "Validation des champs sont incorrects";
      }
    }
    formValidation(inputValues);
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

const formValidation = (inputValues) => {
  console.log(inputValues);
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

const initContactForm = async () => {
  const { photographer } = await getProfilePhotograph();

  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML += "<br/>" + photographer[0].name;

  const btnDisplayModal = document.querySelector(".contact_me");
  const btnCloseModal = document.querySelector(".contact_close");

  btnDisplayModal.addEventListener("click", () => displayModal());
  btnCloseModal.addEventListener("click", () => closeModal());
  modalContent.addEventListener("keydown", (event) => tabFocusFormContact(event));

  formVerification();
};

initContactForm();
