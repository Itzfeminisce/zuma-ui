"use strict";
const axios = require('axios')
import DOM from "./lib/refactorDOM.js";
import Zuma from "./Zuma.js";
import ConfigAssistance from "./ConfigAssistance.js";
import chats from "./chats.js";
import "./assets/app.css"
import {useCsrfToken} from './lib/hooks.js'
//import BOT from "./BOT.js";
const App = (launcher, config, botConversations = chats) => {
  const a = axios({
    method:"POST",
    data:{foo:"Var"},
    url:"http://localhost:8000/api/ticket/",
    headers:{
      "X-CSRFToken":useCsrfToken(),
      "Content-Type":"application/json"
    }
  }).then(a=>{
    console.log("Axios: ",a)
  })
 // if(window.tailwind && "config" in window.config.tailwind){
 // }
  const zuma = new Zuma(launcher);
   const e = new ConfigAssistance(zuma);
  e.setConfig(config||{}, botConversations);
 //App.getConfig = ()=> e;
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
//window.Zuma = window.Zuma || App
export default App;
