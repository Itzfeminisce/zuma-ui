      window.addEventListener("load", () => {
    
        const { default: App } = Zuma;
        const launcher = document.getElementById("zuma");
        try {
          const engine = App(launcher);
          engine.startApp();
        } catch (e) {
          console.log(e);
        }
      });
