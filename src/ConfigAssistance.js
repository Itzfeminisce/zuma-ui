"use strict";
import config from "./config.js";
import { getType, toMap, isFunc, isString, isArray } from "./lib/common.js";

class ConfigAssistance {
  #config;
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }
  setConfig(_config){
    const c = toMap(config);
    const d = toMap(_config);
   // console.log(...d)
    // Only valid fields are accepted in the custom config.js custom file
    d.forEach((v, k) => {
      if (!c.has(k)) {
        throw new Error(
          `Property {${k}} in your ${config.file} is not a valid field..Received (${v}) kindly check for valid fields at @url`
        );
      }
    });
    const e = new Set([...c, ...d]);
    e.forEach(([key, value]) => {
     // console.log(key, value)
      if (isFunc(this[key])) {
        this[key](value);
      } else this.#validateProp(key, value);
    });
    window.localStorage.setItem("clientConfig", JSON.stringify({ ...this }));
    this.#config = this
//window.sessionStorage.setItem("clientConfig",JSON.stringify(this.getConfig()))
    this.#ctx.setConfig(this.getConfig());
    //Object.freeze(this)
  }
  getConfig(){
    const c = window.localStorage.getItem("clientConfig")
if(!c) throw new Error("Configuration file missing.")
    return JSON.parse(c)
  }
  #validateProp(prop, value) {
    switch (prop) {
      case "theme.dark":
      case "theme.light":
        if (!(isArray(value) || isString(value)))
          throw new Error(
            `${prop} must be of type Array. ${getType(value)} received`
          );
        if (isString(value)) this[prop] = value.split(" ").map((e) => e.trim());
        else this[prop] = value;
        break;
      default:
        this[prop] = value;
    }
  }
  ["launcher.position"](v) {
    let pos;
    if (isFunc(v)) {
      return this.#ctx.setLauncherPosition(v(this.#ctx.getLauncherPositions()));
    }
    if (isString(v)) {
      return this.#ctx.setLauncherPosition(v);
    }
    throw new Error(
      "{launcher.position} expects either Function or String (" +
        typeof v +
        ") received."
    );
  }
  ["launcher.tailwind"](tailwind) {
    this.#ctx.setLauncherCustomStyling(tailwind);
  }
  ["onOpen"](v) {
    if (!isFunc(v))
      throw new Error(
        `launcher.beforeLaunch must be a Function. ${getType(v)} received`
      );
    this.#ctx.onOpen = v;
  }
  ["onClose"](v) {
    if (!isFunc(v))
      throw new Error(
        `launcher.beforeLaunch must be a Function. ${getType(v)} received`
      );
    this.#ctx.onClose = v;
  }
  startApp() {
    return this.#ctx.run();
  }
}

export default ConfigAssistance;
