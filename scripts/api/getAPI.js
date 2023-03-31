export async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const media = data.media;

  return { photographers, media };
}

export const getProfilePhotograph = async () => {
  const getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  const photographId = parseInt(searchParams.get("id"));

  const response = await fetch("./data/photographers.json");
  const data = await response.json();

  const photographer = data.photographers.filter((f) => f.id === photographId);
  const media = data.media.filter((f) => f.photographerId === photographId);

  return { photographer, media };
};
