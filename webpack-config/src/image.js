import Kiwi from "./kiwi.jpeg";

function addImage() {
  const image = document.createElement("img"); // or alternatively, const image = document.createElement("img")
  image.alt = "Kiwi";
  image.width = 200;
  image.height = 200;
  image.src = Kiwi;
  const body = document.querySelector("body");
  body.appendChild(image);
}

export default addImage;
