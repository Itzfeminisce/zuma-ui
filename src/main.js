"use strict";
import DOM from "./lib/refactorDOM.js";
import Zuma from "./Zuma.js";
import ConfigAssistance from "./ConfigAssistance.js";

const App = (launcher, config) => {
  const zuma = new Zuma(launcher);
  const e = new ConfigAssistance(zuma);
  e.setConfig(config);
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

export default App;
