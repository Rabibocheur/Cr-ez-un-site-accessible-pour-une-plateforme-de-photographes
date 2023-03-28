export const photographerFactory = (data) => {
  const { id, name, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("aria-label", name);
    link.setAttribute("href", `photographer.html?id=${id}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const countryParagraph = document.createElement("p");
    countryParagraph.textContent = `${city}, ${country}`;
    countryParagraph.setAttribute("class", "photograph__country");

    const taglineParagraph = document.createElement("p");
    taglineParagraph.textContent = tagline;
    taglineParagraph.setAttribute("class", "photograph__tagline");

    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = `${price}€/jour`;
    priceParagraph.setAttribute("class", "photograph__price");

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(countryParagraph);
    article.appendChild(taglineParagraph);
    article.appendChild(priceParagraph);

    return article;
  };

  const getProfilePhotograph = () => {
    const photographName = document.querySelector(".photograph-name");
    const photographCountry = document.querySelector(".photograph-text--country");
    const photographTagline = document.querySelector(".photograph-text--tagline");
    const photographImage = document.querySelector(".photograph-image");
    const photographPrice = document.querySelector(".photograph-price");

    photographName.textContent = name;
    photographCountry.textContent = `${city}, ${country}`;
    photographTagline.textContent = tagline;
    photographImage.src = picture;
    photographImage.alt = name;
    photographPrice.textContent = `${price}€ / jour`;
  };

  const eventLikeMedia = () => {
    const postLikes = document.querySelectorAll(".media-liked");
    let likedMedia = [];
    console.log(likedMedia);
    postLikes.forEach((liked, i) => {
      liked.addEventListener("click", () => {
        let nbrLiked = liked.previousElementSibling;
        if (!likedMedia[i]) {
          likedMedia[i] = 1;
          liked.classList.remove("fa-regular");
          liked.classList.add("fa-solid");
          nbrLiked.textContent = parseInt(nbrLiked.textContent) + 1;
        } else {
          likedMedia[i] = 0;
          liked.classList.add("fa-regular");
          liked.classList.remove("fa-solid");
          nbrLiked.textContent = parseInt(nbrLiked.textContent) - 1;
        }
        totalMediaLiked();
      });
    });
  };

  const totalMediaLiked = () => {
    const photographTotalLikes = document.querySelector(".photograph-total-likes");
    const photographAllLikes = document.querySelectorAll(".media-likes-count");
    let totalLikes = null;
    photographAllLikes.forEach((likes) => (totalLikes += parseInt(likes.textContent)));
    photographTotalLikes.textContent = totalLikes;
  };

  return { getUserCardDOM, getProfilePhotograph, eventLikeMedia, totalMediaLiked };
};
