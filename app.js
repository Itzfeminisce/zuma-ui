
//import chats from "./chats.js";
//import config from "./_bot.config.js";
window.addEventListener("load", () => {
  const {default:App} = Zuma
  const launcher = document.getElementById("zuma");
  
  try {
    const engine = App(launcher);
   // console.log(engine.getConfig())
    engine.startApp();
  } catch (e) {
   console.log(e);
 }
});
