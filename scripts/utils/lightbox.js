export const initLightbox = () => {
  const mediaImage = document.querySelectorAll(".media-image");

  mediaImage.forEach((media) => {
    const mediaId = media.parentElement.dataset.id;
    media.addEventListener("click", () => gestionLightbox(mediaId));
    media.onkeyup = (e) => {
      if (e.key == "Enter") gestionLightbox(mediaId);
    };
  });
};

const gestionLightbox = (mediaId) => {
  const lightbox = document.querySelector(".lightbox");
  const allMediaModal = document.querySelectorAll(".media_modal");
  const btnCloseLightbox = document.querySelector(".lightbox_close");
  const rightLightbox = document.querySelector(".lightbox_right");
  const leftLightbox = document.querySelector(".lightbox_left");

  lightbox.style.display = "flex";

  for (const media of allMediaModal) {
    media.dataset.id == mediaId ? (media.style.display = "block") : null;
  }

  document.onkeyup = navigateWithKeyLigthbox;

  rightLightbox.addEventListener("click", navigateRightLightbox);
  leftLightbox.addEventListener("click", navigateLeftLightbox);
  btnCloseLightbox.addEventListener("click", closeLightbox);
};

const navigateWithKeyLigthbox = (e) => {
  if (e.key == "ArrowLeft") {
    navigateLeftLightbox();
  } else if (e.key == "ArrowRight") {
    navigateRightLightbox();
  } else if (e.key == "Escape") {
    closeLightbox();
  }
};

const closeLightbox = () => {
  const lightbox = document.querySelector(".lightbox");
  const allMediaModal = document.querySelectorAll(".media_modal");
  for (const media of allMediaModal) media.style.display = "none";
  lightbox.style.display = "none";
};

const navigateRightLightbox = () => {
  const allMediaModal = document.querySelectorAll(".media_modal");
  for (const media of allMediaModal) {
    const nextMedia = media.nextElementSibling;
    if (media.style.display === "block" && nextMedia != null) {
      nextMedia.style.display = "block";
      media.style.display = "none";
      break;
    }
  }
};

const navigateLeftLightbox = () => {
  const allMediaModal = document.querySelectorAll(".media_modal");
  for (const media of allMediaModal) {
    const previousMedia = media.previousElementSibling;
    if (media.style.display === "block" && previousMedia != null) {
      previousMedia.style.display = "block";
      media.style.display = "none";
      break;
    }
  }
};
