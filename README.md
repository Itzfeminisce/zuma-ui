# Zumabot

## Zumabot is a JavaScript powered embeddable bot with full customization in mind, that powers business to client query resolution

- Installation:
-- via npm npm install zuma
-- via yarn yarn add zuma
-- via unpkg unpkg.com/zuma@1.0.0/dist/main.dev.js

Usage:

```js
import Zuma from "zuma";

window.addEventListener("load", () => {
    new Zuma({ launcher: document.getElementById("zuma") })
    .run();
});
```
