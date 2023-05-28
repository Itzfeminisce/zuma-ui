"use strict";

import * as refactorDOM from "./lib/refactorDOM.js";
import Intent from "./lib/Intent.js";

import { createLauncher, createStyle } from "./bootstrap.js";
import Index from "./pages/Index.js";

class Zuma {
  constructor(options) {
    this.verifyOptions(options);
    createStyle();
  }

  verifyOptions(options) {
    if ([typeof options !== "object", !options].includes(true))
      throw Error("Invalid argument");
    if (!("launcher" in options)) {
      throw Error(
        `Constructor requires an object with {launcher: HTMLElement} at least.`
      );
    }
    this.launcher = options.launcher;
    this.launcher.addEventListener("click", function () {
        const { Activity } = new Intent().createActivity();
        try{
        Activity.createChildren(Index);
        }catch(e){
          console.log(e)
        }
    });
  }

  run() {
    this.launcher.appendChild(createLauncher());
  }
}

export default Zuma;
