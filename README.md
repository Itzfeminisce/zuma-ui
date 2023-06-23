### Zumabot is a JavaScript powered embeddable bot with full customization in mind, that powers business to client query resolution

### [Official Documentation](https://zumabot.vercel.app)

#### Installation:


[https://cdn.jsdelivr.net/npm/zuma-ui@latest](https://cdn.jsdelivr.net/npm/zuma-ui@latest)

[https://unpkg.com/zuma-ui@latest](unpkg.com/zuma@latest)

`<script src='...'></script>`

#### Active Version: 6.0.10

### Getting Started 
Clone this repo
```git clone https://github.com/Itzfeminisce/embeddable-chatbot.git

yarn install

yarn build
```

If you have live-server installed
Run `live-server --file-path=public`
Otherwise, Open file directly in browser.


### Configurations:

```js
// zuma-ui.config.js

const config = {
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
    light: ["bg-white", "text-black"],
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
    // position:"top-left"
    // position:"bottom-right"
    // position:"bottom-left"
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
// We assume you've created your config file and optionally, a conversation setup to use by our bot. This files can be anywhere in your app. The location is completely up to you
// import config from "./[Your config url].js";
// import Conversations from "./[Your conversation url].js";


window.addEventListener("load", () => {
// App available global as ESModule
  const {default:App} = Zuma
  /**
  * We need your consent in order to inject our app in your website
  */
        const launcher = document.getElementById("zuma");
        try {
          const engine = App(launcher);
          engine.startApp();
        } catch (e) {
          //console.log(e);
        }

```

### Bot Conversation Set

```js
const BOT = [
  {
    id: 0,
    title:
      "I'm Glad to have assisted you this far. Please kindly rate my response. 1 means very unhelpful while 5 means extremely helpful.",
    suggests: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
    },
  },
  {
    id: -1,
    title: "Whats the plan today?",
    suggests: {
      // 0: "Read Docs",
      1: "Read Docs",
      2: "Get CDN",
      3: "Generate Starter app",
      4: "See more",
      5: "Just chilling 😇",
    },
  },
  {
    id: 4,
    title:
      "We also provide a conversation generator that helps you generate how our bot respond to visitors questions just the way i talk to yoi now.",
    suggests: {
      14: "Learn more",
      1: "Read our documentation",
    },
  },
  {
    id: 5,
    title:
      "Thank you for using our app. Please let me know if you need my help.",
    suggests: {
      0: "You're welcome.",
      1: "Read our documentation",
    },
  },
  {
    id: 3,
    title: "You can clone/fork this project source from our github repo",
    suggests: {
      13: "GOTO:github.com/Itzfeminisce/embeddable -chatbot.git",
      1: "Read our documentation",
    },
  },
  {
    id: 2,
    title: "Here's the our CDN. kindly copy/paste in your page.",
    suggests: {
      12: "COPY:https://unpkg.com/zuma-ui@latest",
      13: "That's all",
    },
  },
  {
    id: 1,
    title:
      "Great choice! A better way of understanding any project is by taking a glance at the documentations. However, the choice is yours.",
    suggests: {
      6: "Get Started",
      7: "APIs",
      8: "Configuration File",
      9: "What is Intent?",
      0: "Quit",
    },
  },
  {
    id: 6,
    title:
      "Our app is designed with full customisation in mind. You should started by appending our CDN into your page and see the magic",
    suggests: { 2: "Get CDN", 11: "Generate Starter Kit", 1: "Return" },
  },
];

export default BOT;
```

How our conversation file works
Every Object entries have its corresponding [id:Int, title:String, suggests: Array<{Int :String}>] format as you can see above

Object.suggests [id] field points to Object.id giving us the ability of backward compatibility.

Users can navigate from one suggest to another and our bot will just do well by responding with the correct suggest for the next question.

Let us know via [Github Issues](https://github.com/Itzfeminisce/embeddable-chatbot#issues) if any problem occurs during setup.

### Enjoy!
