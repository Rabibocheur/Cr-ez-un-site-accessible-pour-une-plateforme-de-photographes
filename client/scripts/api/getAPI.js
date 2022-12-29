export async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const media = data.media;

  return { photographers, media };
}
