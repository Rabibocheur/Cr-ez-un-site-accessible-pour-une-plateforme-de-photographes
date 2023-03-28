import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { initLightbox } from "../utils/lightbox.js";
import { initListBox } from "../utils/listbox.js";

const getPhotographers = async () => {
  const getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  const photographId = parseInt(searchParams.get("id"));

  const response = await fetch("./data/photographers.json");
  const data = await response.json();

  const photographer = data.photographers.filter((f) => f.id === photographId);
  const media = data.media.filter((f) => f.photographerId === photographId);

  return { photographer, media };
};

const displayData = (photographer, photographerMedia) => {
  const photographerModel = photographerFactory(photographer[0]);
  const photographerMediaDOM = document.querySelector(".photographer-media");
  const lightboxModal = document.querySelector(".lightbox_modal");

  photographerModel.getProfilePhotograph();

  photographerMedia.forEach((media) => {
    const mediaModel = mediaFactory(media);

    const photographerMediaModel = mediaModel.getMediaCardDOM();
    photographerMediaDOM.appendChild(photographerMediaModel);

    const lightboxModalModel = mediaModel.getLightboxMediaDOM();
    lightboxModal.appendChild(lightboxModalModel);
  });

  photographerModel.totalMediaLiked();
  photographerModel.eventLikeMedia();
};

const init = async () => {
  const { photographer, media } = await getPhotographers();
  displayData(photographer, media);

  initLightbox();
  initListBox();
};

init();
