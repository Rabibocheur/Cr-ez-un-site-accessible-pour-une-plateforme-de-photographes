function photographerFactory(data) {
  const { id, name, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
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
  }

  return { name, picture, getUserCardDOM };
}
