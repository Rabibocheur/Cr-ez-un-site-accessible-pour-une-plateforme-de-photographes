import { getProfilePhotograph } from "../api/getAPI.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { initLightbox } from "../utils/lightbox.js";

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
  const { photographer, media } = await getProfilePhotograph();
  displayData(photographer, media);
  initLightbox();
};

init();
