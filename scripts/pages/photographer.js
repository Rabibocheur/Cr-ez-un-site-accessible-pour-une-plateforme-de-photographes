import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { initLightbox } from "../utils/lightbox.js";

const getPhotographers = async () => {
  const getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  const photographId = parseInt(searchParams.get("id"));

  const response = await fetch("../../data/photographers.json");
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

const mediaSortBy = () => {
  const selectSortBy = document.getElementById("sortby");
  const photographerMediaDOM = document.querySelector(".photographer-media");
  let articlesMedia = document.querySelectorAll("article");

  if (selectSortBy.value === "popularity") {
    articlesMedia = [...articlesMedia].sort((a, b) => {
      const aMediaLikes = a.querySelector(".media-likes-count");
      const bMediaLikes = b.querySelector(".media-likes-count");
      return parseInt(aMediaLikes.textContent) - parseInt(bMediaLikes.textContent);
    });
  } else if (selectSortBy.value === "date") {
    articlesMedia = [...articlesMedia].sort(
      (a, b) => new Date(a.dataset.date) - new Date(b.dataset.date)
    );
  } else if (selectSortBy.value === "title") {
    articlesMedia = [...articlesMedia].sort((a, b) =>
      a.dataset.title.localeCompare(b.dataset.title)
    );
  }
  const lightboxModal = document.querySelector(".lightbox_modal");
  const allMediaModal = document.querySelectorAll(".media_modal");

  let articlesId = [];
  let newMediaModal = [];

  for (const article of articlesMedia) articlesId.push(article.dataset.id);

  for (const articleId of articlesId) {
    for (const media of allMediaModal) {
      if (media.dataset.id == articleId) newMediaModal.push(media);
    }
  }

  articlesMedia.forEach((article) => photographerMediaDOM.appendChild(article));
  newMediaModal.forEach((media) => lightboxModal.appendChild(media));
};

const init = async () => {
  const { photographer, media } = await getPhotographers();
  displayData(photographer, media);

  initLightbox();

  const selectSortBy = document.getElementById("sortby");
  selectSortBy.addEventListener("change", mediaSortBy);
};

init();
