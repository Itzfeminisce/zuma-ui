"use strict";
import config from "./config.js";
import {
  getType,
  toMap,
  isFunc,
  isString,
  isArray,
  fromMap,
  hasProp,
  isObject,
} from "./lib/common.js";

class ConfigAssistance {
  #config;
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  setConfig(_config, conversations) {
    if (isArray(_config) && _config.every((it) => isObject(it))) {
      conversations = _config;
      _config = {}
    }
    this.CHATS = this.#convertToStandardConversable(
      fromMap(Array.from(toMap(conversations)))
    );
    const c = toMap(config);
    const d = toMap(_config);
    // console.log(...d)
    // Only valid fields are accepted in the custom config.js custom file
    d.forEach((v, k) => {
      if (!c.has(k) && k !== "CHATS") {
        throw new Error(
          `Property {${k}} in your ${config.file} is not a valid field..Received (${v}) kindly check for valid fields at @url`
        );
      }
      if(k === "prefix" && !k.endsWith("-")) throw new Error(`You have a typo in your config. Expected {${k}:${v}-} but received {${k}:${v}}`)
    });
    
    const e = new Set([...c, ...d]);
    e.forEach(([key, value]) => {
      if (isFunc(this[key])) {
        this[key](value);
      } else this.#validateProp(key, value);
    });
    window.localStorage.setItem("clientConfig", JSON.stringify({ ...this }));
    this.#config = this;
    //window.sessionStorage.setItem("clientConfig",JSON.stringify(this.getConfig()))
    this.#ctx.setConfig(this.getConfig());
    ("presets" in this.#ctx && isFunc(this.#ctx.presets)) && this.#ctx.presets()
    Object.freeze(this)
  }
  getConfig() {
    const c = window.localStorage.getItem("clientConfig");
    if (!c) throw new Error("Configuration file missing.");
    return JSON.parse(c);
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

  #convertToStandardConversable(_) {
    const result = _.map((obj, i) => {
      const suggests = [];
      const { id, title, ...rest } = obj;
      if (isNaN(id))
        throw new Error(
          `Entry #id must be a valid number btw 0-9. ${typeof id} perceived in your entry array at index ${i} just close to <title:"${title}">.`
        );
      if (!(id != "undefined" && title))
        throw new Error(
          "Conversation Format Error: Something in your conversation file isn't right. Conversation entries must be in this format; [id:Int title:String, suggests:Array<Object, {<Int>:String|Int}>]"
        );
      else
        Object.entries(rest)
          .sort(([key1], [key2]) => key1 - key2)
          .map(([key, value]) => {
            if (isNaN(key))
              throw new Error(
                `Entry with key #${key} is not supported. keys must be a number.`
              );
            else suggests[key] = value;
          });
      return { title, id, suggests };
    });
    return result;
  }
}

export default ConfigAssistance;
