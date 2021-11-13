import "./hello-world-button.css";
import "./hello-world-para.scss";

class HelloWorldButton {
  textCssClass = "hello-world-button";

  render() {
    const button = document.createElement("button");
    const body = document.querySelector("body");
    button.innerHTML = "Hello World";
    // This is the name of the class in that file, not the file name itself.
    button.classList.add(this.textCssClass);
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Clicked!!!";
      // This is the name of the class in that file, not the file name itself.
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };

    body.appendChild(button);
  }
}

export default HelloWorldButton;
