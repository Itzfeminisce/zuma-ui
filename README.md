
### Zumabot is a JavaScript powered embeddable bot with full customization in mind, that powers business to client query resolution

### [Official Documentation](https://zumabot.vercel.app)

#### Installation:

[https://cdn.jsdelivr.net/npm/zuma-ui@latest](https://cdn.jsdelivr.net/npm/zuma-ui@latest)

[https://unpkg com/zuma-ui@latest](unpkg.com/zuma@latest)

#### Active Version: 5.0.2


### Usage:

```js
// zuma-ui.config.js

const config = {
  animation: "animate__fadeIn",
  appName: "Your App name without space",
  file: "zuma-ui.config.js",
  fonts: {
    primary: `'Sedgwick Ave Display', cursive`,
    secondary: `'Archivo', sans-serif`,
  },

  /**
   * Feel free to apply theming classes as desired
   * Valid tailwind classes or predefined classes work too
   * @prop dark Array<String>
   * @prop light Array<String>
   **/
  theme: {
    dark: ["bg-slate-700", "text-white"],
    
    /**
     * Passing tailwindcss gradient colors will kill your app and make it slow as hell. 
     * theme.*: ["bg-gradient-to-b","from-transparent","via-slate-200","to-slate-300", text-black"],
     * */
   light: ["bg-white","text-black"],
  },


  /**
   * You can style our launcher button to suit your desire
   *
   * position:"bottom-left",
   * position:pos=>pos["bottom-left"],
   * tailwind:"text-yellow-700 bg-red-300 rounded-full"
   *
   */
  launcher: {
    // position:"top-right"
  },
  onOpen: (next, launcher) => {
    /**
     * Do stuffs like;
     * API calls
     * Transform launcher to loading indicator
     * then call next() to continue the execution
     */
    launcher.classList.remove("fa-inbox");
    launcher.classList.add("fa-spinner");
    next();
  },

  onClose: (launcher) => {
    /**
     * Do some clean up like:
     * remove loader/loading indicator
     * inform users of some tips
     * Ask for user experience or request feedback
     */
    launcher.classList.remove("fa-spinner");
    launcher.classList.add("fa-inbox");
  },
};


export default config;

```
```js
// We assume you've created your config file. This file can be anywhere in your app. The location is completely up to you
// import config from "./[Your config url].js";


window.addEventListener("load", () => {
  /**
  * We need your consent in order to inject our app in your website 
  */
  const launcher = document.getElementById("zuma");
  
  // Call our app like a regular function
  const engine = App(launcher, config);
  
  // Lets get started!
  engine.startApp();
});

```

### Enjoy!