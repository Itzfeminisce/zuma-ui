import App from "./src/main.js";
//import config from "./_bot.config.js";
window.addEventListener("load", () => {
  const launcher = document.getElementById("zuma");
  try {
    const engine = App(launcher, 
    {
      appName:"Proton"
    });
    engine.startApp();
  } catch (e) {
    alert(e);
  }
});
