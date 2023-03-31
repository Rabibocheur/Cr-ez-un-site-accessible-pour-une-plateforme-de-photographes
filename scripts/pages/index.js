import { getPhotographers } from "../api/getAPI.js";
import { photographerFactory } from "../factories/photographer.js";

const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

const init = async () => {
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();
