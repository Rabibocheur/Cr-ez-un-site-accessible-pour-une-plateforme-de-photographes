export const mediaFactory = (data) => {
  const { id, photographerId, title, image, video, likes, date } = data;

  let picture = `assets/media/${photographerId}/${image}`;

  let media = null;

  if (video != undefined) {
    picture = `assets/media/${photographerId}/${video}`;

    media = document.createElement("video");
    media.width = "350";
    media.textContent = "Sorry, your browser doesn't support embedded videos.";

    const source = document.createElement("source");
    source.src = picture;
    source.type = "video/mp4";
    media.appendChild(source);
  } else {
    media = document.createElement("img");
    media.alt = title;
    media.src = picture;
  }

  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    article.dataset.id = id;
    article.dataset.date = date;
    article.dataset.title = title;

    const mediaCard = media.cloneNode(true);
    mediaCard.setAttribute("class", "media-image");
    mediaCard.tabIndex = 0;

    const divSectionFooter = document.createElement("div");
    divSectionFooter.setAttribute("class", "media-footer");

    const descriptionImg = document.createElement("p");
    descriptionImg.textContent = title;

    const divLike = document.createElement("div");
    divLike.setAttribute("class", "media-likes");

    const like = document.createElement("span");
    like.setAttribute("class", "media-likes-count");
    like.textContent = likes;

    const likeImg = document.createElement("i");
    likeImg.setAttribute("class", "media-liked fa-regular fa-heart");
    likeImg.alt = "likes";

    divSectionFooter.appendChild(descriptionImg);
    divSectionFooter.appendChild(divLike);

    divLike.appendChild(like);
    divLike.appendChild(likeImg);

    article.appendChild(mediaCard);
    article.appendChild(divSectionFooter);

    return article;
  };

  const getLightboxMediaDOM = () => {
    const mediaLightbox = media.cloneNode(true);
    if (video != undefined) mediaLightbox.controls = true;
    mediaLightbox.setAttribute("class", "media_modal");
    mediaLightbox.dataset.id = id;
    mediaLightbox.dataset.title = title;
    mediaLightbox.style.display = "none";

    return mediaLightbox;
  };

  return { getMediaCardDOM, getLightboxMediaDOM };
};
