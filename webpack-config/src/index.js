import addImage from "./image.js";
import addText from "./text.js";
import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import Heading from "./components/heading/heading.js";

const heading = new Heading();
heading.render();

const button = new HelloWorldButton();
button.render();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  console.log("production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("development mode");
}

addImage();
addText();
