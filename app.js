import App from "./src/main.js";
//import chats from "./chats.js";
//import config from "./_bot.config.js";
window.addEventListener("load", () => {
  const launcher = document.getElementById("zuma");
  try {
    const engine = App(launcher/** config *//** chats */);
    engine.startApp();
  } catch (e) {
    console.log(e);
  }
});
