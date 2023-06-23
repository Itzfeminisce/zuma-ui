"use strict";
import { createNode, selectNode } from "./common.js";
import { useWindow } from "./hooks.js";
import { color } from "./utils.js";
import config from "../config.js";
import EException from "../exception/EmbeddableException.js";

import IntentManager from "./IntentManager.js";

let initialized = false;

class Intent {
  #frameColor = config?.colors?.appBgColor;
  constructor() {
    this.navigation = {
      links: [],
      elements: [],
      bar: null,
      visible: true,
      availableElementsContainer: null,
    };
    this.running = false;
    IntentManager.setActivity(this);
  }
  refresh(ctx) {
    ctx.frame.replaceWith(ctx.frame);
    return ctx;
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
    const nav = frame.nextNode();

    const goBack = nav.nextNode(null, "button");
    goBack.type = "button";
    goBack.setCss(
      `fa fa-${
        this.hasPrev ? "arrow-left" : "arrows-to-dot"
      } p-2 rounded-full shadow-lg bg-white/30 font-normal text-2xl`
    );
    // ************
    let api, auth, c;
    c = nav.nextNode(null, "div");
    nav.setCss("flex justify-between items-center bg-transparent");

    links?.map((link) => {
      let clickable = c.nextNode(null, `button`);
      //let clickable = c.nextNode(`${link?.url}`, `button`);
      clickable.type = "button";
      clickable.setCss(
        "font-normal p-2 rounded-full bg-transparent fa fa-ellipsis"
      );
      //  clickable.setCss("font-normal p-2 rounded-full bg-transparent");
      clickable.addEventListener(
        "click",
        link?.callback ||
          ((e) => {
            return this.#handleMenu();
            // console.log("Clicked ", link.url);
          })
      );
      this.navigation.elements.push(clickable);
    });

    goBack.addEventListener(
      "click",
      function (e) {
        const app = useWindow();
        if (!this.hasPrev) {
          app.launched = false;
          app.onClose(app.launcher);
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

    this.frame.setCss(
      `fixed w-full h-full top-0 left-0 right-0 bottom-0 p-5 overflow-auto z-[9999]`
    );
    this.createId();
    this.setNavigationLinks([
      { url: "APIs" }, //{ url: "Login" }
    ]);
    this.config = this.#getClientConfig();
    this.next();
    return { Activity: this, frame: this.frame };
  }

  #getClientConfig() {
    return JSON.parse(window.localStorage.getItem("clientConfig"));
  }
  next() {
    if (this.running) {
      selectNode("body").appendChild(this.frame);
    } else {
      const children = this.children;
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
    //this.createFooter(this.frame);
  }
  updateActivity() {
    if (typeof fragment !== "function")
      throw new EException("Argument must be a valid callback function");
    return this;
  }
  createFooter(frame, content = null, node = null) {
    const footer = frame
      .nextNode(content || "Developed by Itzfeminisce", node || "p")
      .setCss("text-center text-sm p-3");
    this.footer = footer;
    return footer;
  }
  removeFooter(frame) {
    frame.removeChild(this.footer);
  }

  #handleMenu() {
    //console.log(this.frame.parentElement.outerHTML)
    const ovl = this.frame.parentElement
      .nextNode()
      .setCss(
        "fixed w-screen h-screen bg-black/30 inset-0 m-auto z-[9999] app-overlay"
      );
    ovl.addEventListener(
      "click",
      (e) => {
        if (e.target.classList.contains("app-overlay")) e.target.remove();
      },
      false
    );
    const mAr = ovl
      .nextNode()
      .setCss(
        "absolute bottom-5 inset-x-0 m-auto max-h-[200px] w-[90%] rounded-2xl overflow-y-auto p-3"
      );
    const menus = [
      { text: "End Chat", icon: "fa fa-close" },
      { text: "Minimize", icon: "fa fa-arrows-to-dot" },
      { text: "Report Issues", icon: "fa fa-exclamation-triangle" },
    ];
    const config = this.#getClientConfig();
    //console.log(config)
    menus.forEach((m, i) => {
      const f = mAr
        .nextNode()
        .setCss(
          `!bg-transparent grid grid-cols-5 items-center ${
            i < menus.length - 1 && "border-b border-b-slate-300"
          }`
        );
      f.nextNode(null, "i").setCss(
        `${m?.icon} mr-3 !text-slate-${
          config.isDarkTheme ? "300" : "500"
        } p-3 rounded-full !bg-transparent text-xl`
      );
      f.nextNode(`${m.text}`, "button").setCss(
        `col-span-4 block text-start !bg-transparent !text-slate-${
          config.isDarkTheme ? "300" : "500"
        }`
      );
    });
  }
}

export default Intent;
