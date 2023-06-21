"use strict";
import Intent from "./lib/Intent.js";
import { createLauncher, createStyle } from "./bootstrap.js";

import { isFunc, isString, isHtmlElement, hasProp } from "./lib/common.js";
import { useWindow } from "./lib/hooks.js";
import Index from "./pages/Index.js";
//import UserInfoCollectionForm from "./pages/UserInfoCollectionForm.js";
//import GetStarted from "./pages/GetStarted.js";

class Zuma {
  #config;
  #pos = {
    "top-left": `top-10 left-10`,
    "top-right": "top-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
  };
  #launcherPosition;
  #launcherCustomStyling;
  #launcher;
  #launched = false; //= Intent.launched;
  constructor(launcher) {
    this.launcher = launcher;
  }
  presets() {
    this.#setLauncher(this.launcher);
    this.setLauncherPosition("bottom-right");
  }
  refreshOnSchemeChange() {
    // console.log("Scheme changed", this);
    this?.intent.refresh(this?.intent);
  }

  setLauncherPosition(pos) {
    if (Object.keys(this.#pos).includes(pos)) {
      return (this.#launcherPosition = this.#pos[pos].split(" ").map(u=>`${this.getConfig().prefix}${u}`).join(" "))
    }
    if (Object.values(this.#pos).includes(pos)) {
      return (this.#launcherPosition = pos);
    }
    throw new Error("Invalid launcher position format detected: " + pos);
  }
  getLauncherPositions(pos) {
    return this.#pos;
  }
  setLauncherCustomStyling(tw) {
    if (!isString(tw))
      throw new Error(
        `Launcher.position expects String. ${tw?.constructor?.name} received`
      );
    this.#launcherCustomStyling = tw?.trim();
  }

  #setLauncher(launcher) {
    if (!isHtmlElement(launcher)) {
      throw new Error("launcher must be of type HTMLElement");
    }
    this.#launcher = launcher;
  }

  #startActivity() {
    this.#launcher.addEventListener("click", () => {
      const app = useWindow();
      app.onOpen = this?.onOpen;
      app.onClose = this?.onClose;
      if (
        Object.hasOwn(this, "onOpen") &&
        isFunc(this.onOpen) &&
        !app.launched
      ) {
        app.onOpen(() => {
          app.launched = true;
          this.#activate();
        }, app.launcher);
      }
    });
  }
  setConfig(c) {
    this.#config = c;
  }
  getConfig() {
    return this.#config;
  }
  #activate() {
    const { Activity } = new Intent().createActivity();
    Activity.createChildren(
      //Index)
      Index, new Map().set("fullname", "Guest"));
    //this.intent = Activity;
  }
  run() {
       createStyle().then((shouldStart) => {
    this.#startActivity();
    const btn = createLauncher({
      pos: this.#launcherPosition,
      tw: this.#launcherCustomStyling,
      config: this.getConfig(),
    });
    if (this.#launcher.childNodes.length > 0) {
      this.#launcher.childNodes.forEach((el) => el.remove());
    }
    setTimeout(async () => {
      this.#launcher.appendChild(btn)
    }, 2000);
    useWindow().launcher = btn;
     });
  }
}

export default Zuma;
