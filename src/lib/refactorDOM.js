"use strict";
import { createNode } from "./common.js";

function DOM(config) {
  //  console.log("DOM", config)
  String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length);
  };

  if (typeof Element.prototype.clearChildren === "undefined") {
    Object.defineProperty(Element.prototype, "clearChildren", {
      configurable: true,
      enumerable: false,
      value: function () {
        while (this.firstChild) this.removeChild(this.lastChild);
      },
    });
  }

  HTMLElement.prototype.setFontFamily = function (font) {
    this.style.fontFamily = font;
    return this;
  };
  /*
  HTMLElement.prototype.setCss = function (style) {
    let classes = config.isDarkTheme
      ? config["theme.dark"]
      : config["theme.light"];
    classes = [...style.split(" "), ...classes];
    
    classes = classes.map((c) => {
      if (c.startsWith("fa")) return c;
      return "zuma-" + c;
    });
    classes.forEach((_cssClass, i) => {
      this.classList.add(`${_cssClass.trim()}`);
    });
 //   console.log(this.classList)

    //this.classList = classList;
    this.classList.add("animate__animated", `${config.animation}`);

    this.addEventListener("animationend", function () {
      this.classList.remove(`${config.animation}`);
    });
    return this;
  };
*/

HTMLElement.prototype.setCss = function (style) {
    let classes = config.isDarkTheme
      ? config["theme.dark"]
      : config["theme.light"];
    classes = [...style.split(" "), ...classes];
    let classList = this.classList;
    classes.forEach((_cssClass, i) => {
      let cl = _cssClass.trim()
    // if(!cl.startsWith("fa")) cl = "zm-"+cl
      this.classList.add(cl);
    });
    //this.classList = classList;
    this.classList.add("animate__animated", `${config.animation}`);
    this.addEventListener("animationend", function () {
      this.classList.remove(`${config.animation}`);
    });
    return this;
  };

  let i = 0;
  HTMLElement.prototype.nextNode = function (
    textContent = "",
    nodeName = "div",
    attributes = {}
  ) {
    const node = createNode(nodeName);
    for (let attribute in attributes) {
      const attr = attributes[attribute];
      if (attribute == "className") {
        attribute = "class";
      }
      node[attribute] = attr;
    }
    if (!["img", "input"].includes(nodeName)) {
      node.innerHTML = textContent;
    }
    this.appendChild(node);
    return node;
  };

  HTMLElement.prototype.nextForm = function (
    action,
    method,
    children = [
      {
        label: "Username",
        name: "name1",
        placeholder: "Type here...",
        id: "input1",
        errorField: "Invalid username",
      },
    ],
    preventDefault = false
  ) {
    let label,
      input,
      inputEl,
      errF,
      inputs = [],
      submitButton;
    const form = createNode("form");
    const submit = createNode("button");

    submit.type = "submit";
    form.action = action;
    form.method = method;

    children?.forEach((input, i) => {
      //  for(const attr of input){
      label = createNode("label");

      if (!input?.label) {
        label.setAttribute("for", input.name);
      } else {
        label.htmlFor = input?.id ?? input.name;
      }
      label.textContent = input?.label?.ucfirst();
      //   }
      if (input?.use) {
        inputEl = createNode(input.use);
        switch (input.use) {
          case "textarea":
            inputEl.rows = input?.rows;
            inputEl.cols = input?.cols;
            break;
          case "button":
            //   inputEl.setAttribute("type","button")
            break;
        }
      } else {
        inputEl = createNode("input");
      }

      inputEl.name = input.name;
      inputEl.placeholder = input.placeholder;
      inputEl.id = input?.id ?? input.name;
      inputEl.setAttribute(
        "type",
        input?.type ??
          ["password", "pwd", "pass", "passwd"].includes(
            input?.name?.toLowerCase()
          )
          ? "password"
          : ["phone", "number", "digit"].includes(input?.name?.toLowerCase())
          ? "number"
          : ["button"].includes(input?.use?.toLowerCase())
          ? "button"
          : "text"
      );
      label.appendChild(inputEl);
      errF = document.createElement("p");
      if (input.errorField) {
        errF.textContent = input.errorField;
        label.appendChild(errF);
      }
      form.appendChild(label);

      inputs.push({ label, inputEl, errorField: errF });
    });
    submitButton = form.nextNode("Submit", "button", { type: "submit" });
    this.appendChild(form);
    return {
      inputs,
      form,
      submitButton,
      onSubmit(clb) {
        if (typeof clb === "function") {
          form.addEventListener("submit", function (e) {
            if (preventDefault) e.preventDefault();
            clb(new FormData(this), e);
          });
        }
      },
    };
  };
}
export default DOM;
