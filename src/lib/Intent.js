"use strict";
import { createNode, selectNode } from "./common.js";
import { color } from "./utils.js";
import config from "../config.js";
import EException from "../exception/EmbeddableException.js";

import IntentManager from "./IntentManager.js";

let initialized = false;

class Intent {
  #frameColor = config?.colors?.appBgColor;
  //color.primary500
  constructor() {
    this.navigation = {
      links: [],
      elements: [],
      bar: null,
      visible: true,
      availableElementsContainer: null,
    };
    // this.internalUI = null
    this.running = false;
    IntentManager.setActivity(this);
  }

  createId() {
    const id = Math.floor(Math.random() * 9999);
    this.frame.setAttribute("id", id);
    this.id = id;
  }
  getId() {
    return this.id;
  }
  getFrameColor() {
    return this.#frameColor;
  }
  setFrameColor(value) {
    if (value?.trim().startsWith("bg-")) {
      this.#frameColor = value.replace("bg-", "");
    } else {
      this.#frameColor = value;
    }
  }

  getNavigationBar() {
    return this.navigation.bar;
  }
  setNavigationLinks(links) {
    if (!(links instanceof Array))
      throw new EException("Argument must be an array");
    this.navigation.links.push(...links);
    this.createNavigationBar();
  }
  getNavigationElements() {
    return this.navigation.elements.slice(1);
  }
  createNavigationBar() {
    const links = this.navigation?.links;
    if (!this.navigation.visible) {
      return this.navigation.bar?.remove();
    }
    // ********* pre-rendered
    const frame = this.frame;
    const nav = frame.nextNode(null, "div");

    const goBack = nav.nextNode(null, "button");
    goBack.type = "button";
    goBack.setCss(
      `fa fa-${this.hasPrev ? "arrow-left" : "home"} text-${
        color.white
      } font-bold p-2 bg-${color.primary700} rounded-full shadow-lg`
    );
    // ************
    let api, auth, c;
    c = nav.nextNode(null, "div");
    nav.setCss("flex justify-between items-center");

    links?.map((link) => {
      let clickable = c.nextNode(`${link?.url}`, `button`);
      clickable.type = "button";
      clickable.setCss("text-white font-bold p-2 rounded-full");
      clickable.addEventListener(
        "click",
        link?.callback ||
          ((e) => {
            console.log("Clicked ", link.url);
          })
      );
      this.navigation.elements.push(clickable);
    });

    goBack.addEventListener(
      "click",
      function (e) {
        if (!this.hasPrev) {
          IntentManager.destroy(this);
        }
        IntentManager.destroy(this);
      }.bind(this)
    );

    this.navigation.elements.unshift(goBack);
    this.navigation.availableElementsContainer = c;
    this.navigation.bar = nav;
  }
  getAvailableElementsContainer() {
    return this.navigation.availableElementsContainer;
  }
  addEvent(event, handler) {
    this.frame.addEventListener(event, function (e) {
      handler(e);
    });
  }
  createActivity() {
    this.running = true;
    this.frame = createNode("div");
    // this.frame.id = 'children-container'
    this.frame.setCss(
      `fixed w-full h-full top-0 left-0 right-0 bottom-0 p-5 bg-${this.getFrameColor()} overflow-auto`
    );
    this.createId();
    this.setNavigationLinks([{ url: "APIs" }, { url: "Login" }]);
    this.next();
    return { Activity: this, frame: this.frame };
  }
  getContext(clb) {
    clb(this);
  }
  next() {
    //this.prev = prev
    if (this.running) {
      selectNode("body").appendChild(this.frame);
    } else {
      const children = this.children;
      console.log("frame is not already running ");
    }
  }
  setData(data) {
    this.data = data;
  }
  createChildren(clb, data = null) {
    if (typeof clb !== "function")
      throw new EException("Argument must be a valid callback function");
    // TODO: Do something with children
    const children = clb({ frame: this.frame, context: this, data });
    this.children = children;
    this.createFooter(this.frame);
  }
  updateActivity() {
    if (typeof fragment !== "function")
      throw new EException("Argument must be a valid callback function");
return this;
  }
  createFooter(frame, content = null, node = null) {
    const footer = frame
      .nextNode(content || "Developed by Itzfeminisce", node || "p")
      .setCss("text-center text-sm p-3 text-white");
    this.footer = footer;
    // frame.appendChild(footer)
    // if(typeof clb === 'function') clb(this.children)
    // if(!rerun) return;
    //  this.next()
    return footer;
  }
  removeFooter(frame) {
    frame.removeChild(this.footer);
    //this.next()
  }
}

export default Intent;
