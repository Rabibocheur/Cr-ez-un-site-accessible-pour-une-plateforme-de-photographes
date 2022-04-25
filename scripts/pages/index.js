async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;

  return {
    photographers: photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    console.log(photographerModel);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
