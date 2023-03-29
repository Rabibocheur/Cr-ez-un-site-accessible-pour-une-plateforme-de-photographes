const contentListbox = document.getElementById("content-listbox");
const options = document.querySelectorAll(".listbox");

const gestionListBox = () => {
  contentListbox.dataset.open = contentListbox.dataset.open === "false" ? "true" : "false";
  contentListbox.addEventListener("keydown", (event) => tabOptionsListBox(event));
  eventOptionsListBox();
};

const tabOptionsListBox = (event) => {
  const optionsTab = document.querySelectorAll(".listbox");
  const optionsLength = optionsTab.length;
  const lastOptionIndex = optionsLength - 1;

  if (event.key === "Tab" && contentListbox.dataset.open === "true") {
    if (!event.shiftKey && document.activeElement === optionsTab[lastOptionIndex]) {
      event.preventDefault();
      contentListbox.focus();
    }
  }
};

const eventOptionsListBox = () => {
  options.forEach((option) => {
    if (contentListbox.dataset.open === "false") option.removeAttribute("tabindex");
    else option.setAttribute("tabindex", "0");

    option.addEventListener("click", () => selectOptionListBox(option));

    option.addEventListener("keydown", (event) => {
      if (event.code === "Enter") selectOptionListBox(option);
    });
  });
};

const selectOptionListBox = (option) => {
  options.forEach((opt) => {
    opt.setAttribute("aria-selected", "false");
    opt.removeAttribute("id");
  });
  option.setAttribute("aria-selected", "true");
  option.setAttribute("id", "selected-item");
  option.parentNode.insertBefore(option, option.parentNode.firstChild);
  mediaSortBy(option.dataset.value);
};

const mediaSortBy = (value) => {
  const photographerMediaDOM = document.querySelector(".photographer-media");
  let articlesMedia = document.querySelectorAll("article");

  if (value === "popularity") {
    articlesMedia = [...articlesMedia].sort((a, b) => {
      const aMediaLikes = a.querySelector(".media-likes-count");
      const bMediaLikes = b.querySelector(".media-likes-count");
      return parseInt(bMediaLikes.textContent) - parseInt(aMediaLikes.textContent);
    });
  } else if (value === "date") {
    articlesMedia = [...articlesMedia].sort(
      (a, b) => new Date(a.dataset.date) - new Date(b.dataset.date)
    );
  } else if (value === "title") {
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

const initListBox = () => {
  contentListbox.addEventListener("click", () => gestionListBox());

  contentListbox.addEventListener("keydown", (event) => {
    if (event.code === "Enter") gestionListBox();
  });

  mediaSortBy("popularity");
};

initListBox();
