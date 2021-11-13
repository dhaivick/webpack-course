import dummyText from "./dummy.txt";

function addText() {
  const para = document.createElement("p");
  para.innerText = dummyText;
  const body = document.querySelector("body");
  body.appendChild(para);
}

export default addText;
