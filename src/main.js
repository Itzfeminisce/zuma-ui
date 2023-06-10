"use strict";
import DOM from "./lib/refactorDOM.js";
import Zuma from "./Zuma.js";
import ConfigAssistance from "./ConfigAssistance.js";
import chats from "./chats.js";
import "./assets/app.css"
//import BOT from "./BOT.js";
const App = (launcher, config, botConversations = chats) => {
 // if(window.tailwind && "config" in window.config.tailwind){
 // }
  const zuma = new Zuma(launcher);
  const e = new ConfigAssistance(zuma);
  e.setConfig(config||{}, botConversations);
  /**
   * Should user decide to change device theme, we should update config.isDarkTheme to their peferred choice
   **/

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      e.setConfig({
        ...e.getConfig(),
        isDarkTheme: event.matches,
      });
      DOM(e.getConfig());
      e.startApp();
    });

  DOM(e.getConfig());
  return e;
};

//window[e.appName] = (window[e.appName] || "Zuma") = App;
//console.log(e)
window.Zuma = window.Zuma || App
export default App;
