/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/main.js */ \"./src/main.js\");\n\n//import config from \"./_bot.config.js\";\nwindow.addEventListener(\"load\", () => {\n  const launcher = document.getElementById(\"zuma\");\n  try {\n    const engine = (0,_src_main_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(launcher, \n    {\n      appName:\"Proton\"\n    });\n    engine.startApp();\n  } catch (e) {\n    alert(e);\n  }\n});\n\n\n//# sourceURL=webpack://zuma-ui/./app.js?");

/***/ }),

/***/ "./src/ConfigAssistance.js":
/*!*********************************!*\
  !*** ./src/ConfigAssistance.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./src/config.js\");\n/* harmony import */ var _lib_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/common.js */ \"./src/lib/common.js\");\n\n\n\n\nclass ConfigAssistance {\n  #config;\n  #ctx;\n\n  constructor(ctx) {\n    this.#ctx = ctx;\n  }\n  setConfig(_config){\n    const c = (0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.toMap)(_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n    const d = (0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.toMap)(_config);\n   // console.log(...d)\n    // Only valid fields are accepted in the custom config.js custom file\n    d.forEach((v, k) => {\n      if (!c.has(k)) {\n        throw new Error(\n          `Property {${k}} in your ${_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].file} is not a valid field..Received (${v}) kindly check for valid fields at @url`\n        );\n      }\n    });\n    const e = new Set([...c, ...d]);\n    e.forEach(([key, value]) => {\n     // console.log(key, value)\n      if ((0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isFunc)(this[key])) {\n        this[key](value);\n      } else this.#validateProp(key, value);\n    });\n    window.localStorage.setItem(\"clientConfig\", JSON.stringify({ ...this }));\n    this.#config = this\n//window.sessionStorage.setItem(\"clientConfig\",JSON.stringify(this.getConfig()))\n    this.#ctx.setConfig(this.getConfig());\n    //Object.freeze(this)\n  }\n  getConfig(){\n    const c = window.localStorage.getItem(\"clientConfig\")\nif(!c) throw new Error(\"Configuration file missing.\")\n    return JSON.parse(c)\n  }\n  #validateProp(prop, value) {\n    switch (prop) {\n      case \"theme.dark\":\n      case \"theme.light\":\n        if (!((0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(value) || (0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isString)(value)))\n          throw new Error(\n            `${prop} must be of type Array. ${(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.getType)(value)} received`\n          );\n        if ((0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) this[prop] = value.split(\" \").map((e) => e.trim());\n        else this[prop] = value;\n        break;\n      default:\n        this[prop] = value;\n    }\n  }\n  [\"launcher.position\"](v) {\n    let pos;\n    if ((0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isFunc)(v)) {\n      return this.#ctx.setLauncherPosition(v(this.#ctx.getLauncherPositions()));\n    }\n    if ((0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isString)(v)) {\n      return this.#ctx.setLauncherPosition(v);\n    }\n    throw new Error(\n      \"{launcher.position} expects either Function or String (\" +\n        typeof v +\n        \") received.\"\n    );\n  }\n  [\"launcher.tailwind\"](tailwind) {\n    this.#ctx.setLauncherCustomStyling(tailwind);\n  }\n  [\"onOpen\"](v) {\n    if (!(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isFunc)(v))\n      throw new Error(\n        `launcher.beforeLaunch must be a Function. ${(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.getType)(v)} received`\n      );\n    this.#ctx.onOpen = v;\n  }\n  [\"onClose\"](v) {\n    if (!(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.isFunc)(v))\n      throw new Error(\n        `launcher.beforeLaunch must be a Function. ${(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_1__.getType)(v)} received`\n      );\n    this.#ctx.onClose = v;\n  }\n  startApp() {\n    return this.#ctx.run();\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigAssistance);\n\n\n//# sourceURL=webpack://zuma-ui/./src/ConfigAssistance.js?");

/***/ }),

/***/ "./src/Zuma.js":
/*!*********************!*\
  !*** ./src/Zuma.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_Intent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Intent.js */ \"./src/lib/Intent.js\");\n/* harmony import */ var _bootstrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bootstrap.js */ \"./src/bootstrap.js\");\n/* harmony import */ var _lib_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/common.js */ \"./src/lib/common.js\");\n/* harmony import */ var _lib_hooks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/hooks.js */ \"./src/lib/hooks.js\");\n/* harmony import */ var _pages_UserInfoCollectionForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/UserInfoCollectionForm.js */ \"./src/pages/UserInfoCollectionForm.js\");\n\n\n\n\n\n\n//import Index from \"./pages/Index.js\";\n\n//import GetStarted from \"./pages/GetStarted.js\";\n\nclass Zuma {\n  #config;\n  #pos = {\n    \"top-left\": \"top-10 left-10\",\n    \"top-right\": \"top-10 right-10\",\n    \"bottom-left\": \"bottom-10 left-10\",\n    \"bottom-right\": \"bottom-10 right-10\",\n  };\n  #launcherPosition;\n  #launcherCustomStyling;\n  #launcher;\n  #launched = false; //= Intent.launched;\n  constructor(launcher) {\n    this.#setLauncher(launcher);\n    this.setLauncherPosition(\"bottom-right\");\n  }\n  refreshOnSchemeChange() {\n   // console.log(\"Scheme changed\", this);\n    this?.intent.refresh(this?.intent);\n  }\n\n  setLauncherPosition(pos) {\n    if (Object.keys(this.#pos).includes(pos)) {\n      this.#launcherPosition = this.#pos[pos];\n      return;\n    }\n    if (Object.values(this.#pos).includes(pos)) {\n      this.#launcherPosition = pos;\n      return;\n    }\n    throw new Error(\"Invalid launcher position format detected: \" + pos);\n  }\n  getLauncherPositions(pos) {\n    return this.#pos;\n  }\n  setLauncherCustomStyling(tw) {\n    if (!(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_2__.isString)(tw))\n      throw new Error(\n        `Launcher.position expects String. ${tw?.constructor?.name} received`\n      );\n    this.#launcherCustomStyling = tw?.trim();\n  }\n\n  #setLauncher(launcher) {\n    if (!(0,_lib_common_js__WEBPACK_IMPORTED_MODULE_2__.isHtmlElement)(launcher)) {\n      throw new Error(\"launcher must be of type HTMLElement\");\n    }\n    this.#launcher = launcher;\n  }\n\n  #startActivity() {\n    this.#launcher.addEventListener(\"click\", () => {\n      const app = (0,_lib_hooks_js__WEBPACK_IMPORTED_MODULE_3__.useWindow)();\n      app.onOpen = this?.onOpen;\n      app.onClose = this?.onClose;\n      if (\n        Object.hasOwn(this, \"onOpen\") &&\n        (0,_lib_common_js__WEBPACK_IMPORTED_MODULE_2__.isFunc)(this.onOpen) &&\n        !app.launched\n      ) {\n        app.onOpen(() => {\n          app.launched = true;\n          this.#activate();\n        }, app.launcher);\n      }\n    });\n  }\n  setConfig(c){\n    this.#config = c\n  }\n  getConfig(){\n    return this.#config\n  }\n  #activate() {\n    const { Activity } = new _lib_Intent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().createActivity();\n    Activity.createChildren(_pages_UserInfoCollectionForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]) //Index);\n    //this.intent = Activity;\n  }\n  run() {\n    (0,_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__.createStyle)().then((shouldStart) => {\n      this.#startActivity();\n      const btn = (0,_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__.createLauncher)({\n        pos: this.#launcherPosition,\n        tw: this.#launcherCustomStyling,\n      });\n      if (this.#launcher.childNodes.length > 0) {\n        this.#launcher.childNodes.forEach((el) => el.remove());\n      }\n      setTimeout(() => {\n        this.#launcher.appendChild(btn);\n      }, 1000);\n      (0,_lib_hooks_js__WEBPACK_IMPORTED_MODULE_3__.useWindow)().launcher = btn;\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Zuma);\n\n\n//# sourceURL=webpack://zuma-ui/./src/Zuma.js?");

/***/ }),

/***/ "./src/bootstrap.js":
/*!**************************!*\
  !*** ./src/bootstrap.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createLauncher: () => (/* binding */ createLauncher),\n/* harmony export */   createStyle: () => (/* binding */ createStyle)\n/* harmony export */ });\n/* harmony import */ var _lib_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/common.js */ \"./src/lib/common.js\");\n/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils.js */ \"./src/lib/utils.js\");\n/* harmony import */ var _exception_EmbeddableException_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exception/EmbeddableException.js */ \"./src/exception/EmbeddableException.js\");\n\n\n\n\n\nconst createStyle = async (clb) => {\n  let dependencies;\n  if ((dependencies = document.querySelectorAll(\".dependency\"))) {\n    dependencies.forEach((d) => d.remove());\n  }\n  try {\n    /*fetchTailwind()\n      .then(() => fetchFontAwesome())\n      .then(() => fetchAnimateCss())\n      .then(() => fetchGoogleFonts())\n      .then((d) => console.log(d));*/\n    const res = await Promise.allSettled([\n      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__.fetchTailwind)(),\n      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__.fetchFontAwesome)(),\n      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__.fetchAnimateCss)(),\n      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__.fetchGoogleFonts)(),\n    ]);\n\n  return res.filter(i=>i.status === \"fulfilled\").length > 0\n // )\n\n       /*.addEventListener(\"load\", async (e)=>{\n        const j =  await Promise.resolve(i)\n        console.log(j)\n         i++\n       })\n         */\n         \n  } catch (e) {\n    throw new _exception_EmbeddableException_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](e);\n  }\n};\nconst createLauncher = ({ pos, tw }) => {\n  const btn = (0,_lib_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(\"button\");\n  btn.type = \"button\";\n  const s = new Set([\n    `fixed`,\n    `${pos}`,\n    `p-5`,\n    `rounded-lg`,\n    `fa fa-inbox`,\n    `text-2xl`,\n    `shadow-2xl`,\n  ]);\n  if (tw?.trim()) {\n    s.add(...tw?.trim()?.split(\" \"));\n  }\n  btn.setCss([...s]?.join(\" \"));\n  return btn;\n};\n\n\n//# sourceURL=webpack://zuma-ui/./src/bootstrap.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nconst config = {\n  prefix: \"embeddable\",\n  animation: \"animate__fadeIn\",\n  appName: \"Zuma\",\n  file: \"zuma.config.js\",\n  fonts: {\n    primary: `'Sedgwick Ave Display', cursive`,\n    secondary: `'Archivo', sans-serif`,\n  },\n  /**\n   *  @prop isDarkTheme bool\n   * Dynamically detect the current color-scheme of user\n   * Must not be overriden\n   **/\n  isDarkTheme: window.matchMedia &&\n   window.matchMedia(\"(prefers-color-scheme: dark)\").matches,\n\n  /**\n   * Feel free to apply theming classes as desired\n   * Valid tailwind classes or predefined classes work too\n   * @prop dark Array<String>\n   * @prop light Array<String>\n   **/\n  theme: {\n    dark: [\"bg-slate-700\", \"text-white\"],\n    \n    /**\n     * Passing tailwindcss gradient colors will kill your app and make it slow as hell. \n     * theme.*: [\"bg-gradient-to-b\",\"from-transparent\",\"via-slate-200\",\"to-slate-300\", text-black\"],\n     * */\n   light: [\"bg-white\",\"text-black\"],\n  },\n  /*colors: {\n    appBgColor: \"slate-700\",\n    appTextColor:\"white\"\n  },*/\n  /**\n   * You can style our launcher button to suit your desire\n   *\n   * position:\"bottom-left\",\n   * position:pos=>pos[\"bottom-left\"],\n   * tailwind:\"text-yellow-700 bg-red-300 rounded-full\"\n   *\n   * Todo: Fix bugs for repeated tailwind classes\n   */\n  launcher: {\n    // position:\"top-right\"\n  },\n  onOpen: (next, launcher) => {\n    /**\n     * Do stuffs like;\n     * API calls\n     * Transform launcher to loading indicator\n     * then call next() to continue the execution\n     */\n    launcher.classList.remove(\"fa-inbox\");\n    launcher.classList.add(\"fa-spinner\");\n    next();\n  },\n\n  onClose: (launcher) => {\n    /**\n     * Do some clean up like:\n     * remove loader/loading indicator\n     * inform users of some tips\n     * Ask for user experience or request feedback\n     */\n    launcher.classList.remove(\"fa-spinner\");\n    launcher.classList.add(\"fa-inbox\");\n  },\n};\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n\n//# sourceURL=webpack://zuma-ui/./src/config.js?");

/***/ }),

/***/ "./src/exception/EmbeddableException.js":
/*!**********************************************!*\
  !*** ./src/exception/EmbeddableException.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EException: () => (/* binding */ EException),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nclass EException extends Error {\n  constructor(message){\n    super(message)\n    \n    this.name = \"EmbeddableException: \"\n    \n    console.log(\n      '................................',\n      `\\nException: ${this.name} \\nMessage: ${this.message} \\nStack: ${this.stack}\\n`,\n      '.................................'\n      )\n  }\n  \n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EException);\n\n//# sourceURL=webpack://zuma-ui/./src/exception/EmbeddableException.js?");

/***/ }),

/***/ "./src/lib/Intent.js":
/*!***************************!*\
  !*** ./src/lib/Intent.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ \"./src/lib/common.js\");\n/* harmony import */ var _hooks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks.js */ \"./src/lib/hooks.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/lib/utils.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config.js */ \"./src/config.js\");\n/* harmony import */ var _exception_EmbeddableException_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../exception/EmbeddableException.js */ \"./src/exception/EmbeddableException.js\");\n/* harmony import */ var _IntentManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IntentManager.js */ \"./src/lib/IntentManager.js\");\n\n\n\n\n\n\n\n\n\nlet initialized = false;\n\nclass Intent {\n  #frameColor = _config_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]?.colors?.appBgColor;\n  constructor() {\n    this.navigation = {\n      links: [],\n      elements: [],\n      bar: null,\n      visible: true,\n      availableElementsContainer: null,\n    };\n    this.running = false;\n    _IntentManager_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].setActivity(this);\n  }\n  refresh(ctx){\n    ctx.frame.replaceWith(ctx.frame)\n    return ctx;\n  }\n  createId() {\n    const id = Math.floor(Math.random() * 9999);\n    this.frame.setAttribute(\"id\", id);\n    this.id = id;\n  }\n  getId() {\n    return this.id;\n  }\n  getFrameColor() {\n    return this.#frameColor;\n  }\n  setFrameColor(value) {\n    if (value?.trim().startsWith(\"bg-\")) {\n      this.#frameColor = value.replace(\"bg-\", \"\");\n    } else {\n      this.#frameColor = value;\n    }\n  }\n\n  getNavigationBar() {\n    return this.navigation.bar;\n  }\n  setNavigationLinks(links) {\n    if (!(links instanceof Array))\n      throw new _exception_EmbeddableException_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"Argument must be an array\");\n    this.navigation.links.push(...links);\n    this.createNavigationBar();\n  }\n  getNavigationElements() {\n    return this.navigation.elements.slice(1);\n  }\n  createNavigationBar() {\n    const links = this.navigation?.links;\n    if (!this.navigation.visible) {\n      return this.navigation.bar?.remove();\n    }\n    // ********* pre-rendered\n    const frame = this.frame;\n    const nav = frame.nextNode(null, \"div\");\n\n    const goBack = nav.nextNode(null, \"button\");\n    goBack.type = \"button\";\n    goBack.setCss(\n      `fa fa-${this.hasPrev ? \"arrow-left\" : \"arrows-to-dot\"} p-2 rounded-full shadow-lg bg-white/30 font-normal text-2xl`\n    );\n    // ************\n    let api, auth, c;\n    c = nav.nextNode(null, \"div\");\n    nav.setCss(\"flex justify-between items-center bg-transparent\");\n\n    links?.map((link) => {\n      let clickable = c.nextNode(`${link?.url}`, `button`);\n      clickable.type = \"button\";\n      clickable.setCss(\"font-normal p-2 rounded-full bg-transparent\");\n      clickable.addEventListener(\n        \"click\",\n        link?.callback ||\n          ((e) => {\n            console.log(\"Clicked \", link.url);\n          })\n      );\n      this.navigation.elements.push(clickable);\n    });\n\n    goBack.addEventListener(\n      \"click\",\n      function (e) {\n        const app = (0,_hooks_js__WEBPACK_IMPORTED_MODULE_1__.useWindow)()\n        if (!this.hasPrev) {\n           app.launched = false;\n          app.onClose(app.launcher)\n        }\n        _IntentManager_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].destroy(this);\n      }.bind(this)\n    );\n\n    this.navigation.elements.unshift(goBack);\n    this.navigation.availableElementsContainer = c;\n    this.navigation.bar = nav;\n  }\n  getAvailableElementsContainer() {\n    return this.navigation.availableElementsContainer;\n  }\n  addEvent(event, handler) {\n    this.frame.addEventListener(event, function (e) {\n      handler(e);\n    });\n  }\n  createActivity() {\n    this.running = true;\n    this.frame = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(\"div\");\n \n    this.frame.setCss(\n      `fixed w-full h-full top-0 left-0 right-0 bottom-0 p-5 overflow-auto`\n    );\n    this.createId();\n    this.setNavigationLinks([{ url: \"APIs\" }, { url: \"Login\" }]);\n    this.config = this.#getClientConfig()\n    this.next();\n    return { Activity: this, frame: this.frame };\n  }\n\n#getClientConfig(){\n  return JSON.parse(window.localStorage.getItem(\"clientConfig\"))\n}\n  next() {\n    if (this.running) {\n      (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.selectNode)(\"body\").appendChild(this.frame);\n    } else {\n      const children = this.children;\n    }\n  }\n  setData(data) {\n    this.data = data;\n  }\n  createChildren(clb, data = null) {\n    if (typeof clb !== \"function\")\n      throw new _exception_EmbeddableException_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"Argument must be a valid callback function\");\n    // TODO: Do something with children\n    const children = clb({ frame: this.frame, context: this, data });\n    this.children = children;\n    this.createFooter(this.frame);\n  }\n  updateActivity() {\n    if (typeof fragment !== \"function\")\n      throw new _exception_EmbeddableException_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\"Argument must be a valid callback function\");\nreturn this;\n  }\n  createFooter(frame, content = null, node = null) {\n    const footer = frame\n      .nextNode(content || \"Developed by Itzfeminisce\", node || \"p\")\n      .setCss(\"text-center text-sm p-3\");\n    this.footer = footer;\n    return footer;\n  }\n  removeFooter(frame) {\n    frame.removeChild(this.footer);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Intent);\n\n\n//# sourceURL=webpack://zuma-ui/./src/lib/Intent.js?");

/***/ }),

/***/ "./src/lib/IntentManager.js":
/*!**********************************!*\
  !*** ./src/lib/IntentManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   useSetInterval: () => (/* binding */ useSetInterval),\n/* harmony export */   useState: () => (/* binding */ useState)\n/* harmony export */ });\n/* harmony import */ var _Intent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Intent.js */ \"./src/lib/Intent.js\");\n\nclass IntentManager {\n  static activities = [];\n  constructor() {}\n\n  static setActivity(activity, Intent) {\n    activity.manager = IntentManager;\n    IntentManager.activities.push(activity);\n    const usePrev = IntentManager.activities.at(\n      IntentManager.activities.indexOf(this) - 1\n    );\n\n    activity.hasPrev = usePrev ? true : false;\n    activity.prev = usePrev;\n  }\n\n  static getCurrentActivity() {\n    return IntentManager.activities.at(-1);\n  }\n\n  static hasPrev() {\n    return IntentManager.length > 1;\n  }\n\n  static getPrev() {\n    return IntentManager.slice(-1, 1);\n  }\n\n  static prev() {\n    IntentManager.splice[(-1, 1)];\n    const newActivity = IntentManager[IntentManageractivities.length - 1];\n    return new newActivity();\n  }\n\n  static next() {}\n\n  static destroy(context, timeout = 200) {\n    setTimeout(() => {\n      context.frame.remove();\n      IntentManager.activities = IntentManager.activities.filter(\n        (activity) => !Object.is(context, activity)\n      );\n    }, timeout);\n  }\n}\n\nconst useState = function (initialValue) {\n  let v = {\n    value: initialValue,\n  };\n\n  function updateValue(value) {\n    v.value = value;\n  }\n  return [v.value, updateValue];\n};\n\nconst useSetInterval = function (cd) {\n  console.log(useSetInterval);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IntentManager);\n\n\n//# sourceURL=webpack://zuma-ui/./src/lib/IntentManager.js?");

/***/ }),

/***/ "./src/lib/common.js":
/*!***************************!*\
  !*** ./src/lib/common.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createNode: () => (/* binding */ createNode),\n/* harmony export */   dotToCamel: () => (/* binding */ dotToCamel),\n/* harmony export */   getById: () => (/* binding */ getById),\n/* harmony export */   getProps: () => (/* binding */ getProps),\n/* harmony export */   getType: () => (/* binding */ getType),\n/* harmony export */   hasProp: () => (/* binding */ hasProp),\n/* harmony export */   isArray: () => (/* binding */ isArray),\n/* harmony export */   isFunc: () => (/* binding */ isFunc),\n/* harmony export */   isHtmlElement: () => (/* binding */ isHtmlElement),\n/* harmony export */   isObject: () => (/* binding */ isObject),\n/* harmony export */   isString: () => (/* binding */ isString),\n/* harmony export */   selectNode: () => (/* binding */ selectNode),\n/* harmony export */   toMap: () => (/* binding */ toMap)\n/* harmony export */ });\n\n//import config from \"../config.js\";\n\n//const config = JSON.parse(window.localStorage.getItem(\"clientConfig\"))\n\n\nconst getById = (id) => document.getElementById(id);\n\nconst selectNode = (name) => {\n  return document.querySelector(name);\n};\n\n\nconst createNode = (name, option) => {\n  const el = document.createElement(name);\n  if (option instanceof Function) {\n    return option(el);\n  }\n  if (option instanceof Object) {\n    if (option.children) {\n      el.children = option.children;\n    }\n    if(hasProp(option,\"attributes\") && isObject(option.attributes)){\n      for(let key in option.attributes){\n      //  console.log(key)\n        el.setAttribute(key, option.attributes[key])\n      }\n    }\n    if(hasProp(option,\"attributes\") && isArray(option.attributes)){\n      option.attributes.forEach(attr=>{\n      if(!(hasProp(attr,\"key\")\n      && hasProp(attr,\"value\"))) throw new Error(\"option.attributes must be an array of Object with {key:String, value:String} format\")\n        el.setAttribute(attr.key, attr.value)\n      })\n    }\n    \n  }\n  if (typeof option === \"string\") {\n    el.innerHTML = option;\n  }\n  return el;\n};\n\nconst isObject = (d) => d?.constructor?.name === \"Object\";\n\n\nconst hasProp = (d, i) => isObject(d) && Object.keys(d).includes(i);\n\n\nconst isString = (d) => d?.constructor?.name === \"String\";\n\n\nconst isArray = (d) => d?.constructor?.name === \"Array\";\n\n\nconst isFunc = (d) => d?.constructor?.name === \"Function\";\n\n\nconst isHtmlElement = (d) => d?.constructor?.name.startsWith(\"HTML\");\n\n\nconst getType = (d) => d?.constructor?.name;\n\n\nconst dotToCamel = (d) => {\n  if (d.includes(\".\")) {\n    const t = [...d];\n    const v = t.indexOf(\".\");\n    t.splice(v, 1, t.at(v + 1).toUpperCase());\n    t.splice(v + 1, 1);\n    return t.join(\"\");\n  }\n  return d;\n};\n\n\nconst toMap = (obj, seperator = \".\", gum = \"=\") => {\n  let result = [];\n  const map = new Map();\n  const traverse = (o, path = \"\") => {\n    for (let key in o) {\n      let value = o[key];\n      if (isObject(value) && Object.keys(value).length > 0) {\n        traverse(value, path + key + seperator);\n      } else {\n        result.push(`${path + key}${gum}${value}`);\n        map.set(`${path}${key}`, value);\n      }\n    }\n  };\n  traverse(obj);\n  return map;\n};\n\n\nconst getProps = (d) => {\n  if (d?.constructor?.name === \"Object\") {\n    return Object.keys(d);\n  }\n  throw new Error(getProps.name, \"Object argument required\");\n};\n\n\n\n//# sourceURL=webpack://zuma-ui/./src/lib/common.js?");

/***/ }),

/***/ "./src/lib/hooks.js":
/*!**************************!*\
  !*** ./src/lib/hooks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useConfig: () => (/* binding */ useConfig),\n/* harmony export */   useImageUrl: () => (/* binding */ useImageUrl),\n/* harmony export */   useSetInterval: () => (/* reexport safe */ _lib_IntentManager_js__WEBPACK_IMPORTED_MODULE_0__.useSetInterval),\n/* harmony export */   useState: () => (/* reexport safe */ _lib_IntentManager_js__WEBPACK_IMPORTED_MODULE_0__.useState),\n/* harmony export */   useWindow: () => (/* binding */ useWindow)\n/* harmony export */ });\n/* harmony import */ var _lib_IntentManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/IntentManager.js */ \"./src/lib/IntentManager.js\");\nconst config = JSON.parse(window.localStorage.getItem(\"clientConfig\"))\n\n\n\nconst useImageUrl = function (imgFile, w, h) {\n  const img = new Image(w || 200, h || 200);\n img.src = imgFile\n  img.onload = function (e) {\n    img.src = e.target.currentSrc;\n  };\n  return img;\n};\n\nconst useWindow = () => {\n const app = window[config?.appName] = window[config?.appName] || {};\n\n  return app //window[config?.appName];\n};\n\nconst useConfig = ()=>{\n  return config\n}\n\n\n//# sourceURL=webpack://zuma-ui/./src/lib/hooks.js?");

/***/ }),

/***/ "./src/lib/refactorDOM.js":
/*!********************************!*\
  !*** ./src/lib/refactorDOM.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ \"./src/lib/common.js\");\n\n\n\nfunction DOM(config) {\n  //  console.log(\"DOM\", config)\n  String.prototype.ucfirst = function () {\n    return this.charAt(0).toUpperCase() + this.slice(1, this.length);\n  };\n\n  if (typeof Element.prototype.clearChildren === \"undefined\") {\n    Object.defineProperty(Element.prototype, \"clearChildren\", {\n      configurable: true,\n      enumerable: false,\n      value: function () {\n        while (this.firstChild) this.removeChild(this.lastChild);\n      },\n    });\n  }\n\n  HTMLElement.prototype.setFontFamily = function (font) {\n    this.style.fontFamily = font;\n    return this;\n  };\n  HTMLElement.prototype.setCss = function (style) {\n    let classes = config.isDarkTheme\n      ? config[\"theme.dark\"]\n      : config[\"theme.light\"];\n    classes = [...style.split(\" \"), ...classes];\n    let classList = this.classList;\n    classes.forEach((_cssClass, i) => {\n      classList.add(_cssClass.trim());\n    });\n    this.classList = classList;\n    this.classList.add(\"animate__animated\", `${config.animation}`);\n\n    this.addEventListener(\"animationend\", function () {\n      this.classList.remove(`${config.animation}`);\n    });\n    return this;\n  };\n\n  let i = 0;\n  HTMLElement.prototype.nextNode = function (\n    textContent = \"\",\n    nodeName = \"div\",\n    attributes = {}\n  ) {\n    const node = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(nodeName);\n    for (let attribute in attributes) {\n      const attr = attributes[attribute];\n      if (attribute == \"className\") {\n        attribute = \"class\";\n      }\n      node[attribute] = attr;\n    }\n    if (![\"img\", \"input\"].includes(nodeName)) {\n      node.innerHTML = textContent;\n    }\n    this.appendChild(node);\n    return node;\n  };\n\n  HTMLElement.prototype.nextForm = function (\n    action,\n    method,\n    children = [\n      {\n        label: \"Username\",\n        name: \"name1\",\n        placeholder: \"Type here...\",\n        id: \"input1\",\n        errorField: \"Invalid username\",\n      },\n    ],\n    preventDefault = false\n  ) {\n    let label,\n      input,\n      inputEl,\n      errF,\n      inputs = [],\n      submitButton;\n    const form = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(\"form\");\n    const submit = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(\"button\");\n\n    submit.type = \"submit\";\n    form.action = action;\n    form.method = method;\n\n    children?.forEach((input, i) => {\n      //  for(const attr of input){\n      label = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(\"label\");\n\n      if (!input?.label) {\n        label.setAttribute(\"for\", input.name);\n      } else {\n        label.htmlFor = input?.id ?? input.name;\n      }\n      label.textContent = input?.label?.ucfirst();\n      //   }\n      if (input?.use) {\n        inputEl = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(input.use);\n        switch (input.use) {\n          case \"textarea\":\n            inputEl.rows = input?.rows;\n            inputEl.cols = input?.cols;\n            break;\n          case \"button\":\n            //   inputEl.setAttribute(\"type\",\"button\")\n            break;\n        }\n      } else {\n        inputEl = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.createNode)(\"input\");\n      }\n\n      inputEl.name = input.name;\n      inputEl.placeholder = input.placeholder;\n      inputEl.id = input?.id ?? input.name;\n      inputEl.setAttribute(\n        \"type\",\n        input?.type ??\n          [\"password\", \"pwd\", \"pass\", \"passwd\"].includes(\n            input?.name?.toLowerCase()\n          )\n          ? \"password\"\n          : [\"phone\", \"number\", \"digit\"].includes(input?.name?.toLowerCase())\n          ? \"number\"\n          : [\"button\"].includes(input?.use?.toLowerCase())\n          ? \"button\"\n          : \"text\"\n      );\n      label.appendChild(inputEl);\n         errF = document.createElement(\"p\");\n      if (input.errorField) {\n        errF.textContent = input.errorField;\n        label.appendChild(errF);\n      }\n      form.appendChild(label);\n\n      inputs.push({ label, inputEl, errorField: errF });\n    });\n    submitButton = form.nextNode(\"Submit\", \"button\", { type: \"submit\" });\n    this.appendChild(form);\n    return {\n      inputs,\n      form,\n      submitButton,\n      onSubmit(clb) {\n        if (typeof clb === \"function\") {\n          form.addEventListener(\"submit\", function (e) {\n            if (preventDefault) e.preventDefault();\n            clb(new FormData(this), e);\n          });\n        }\n      },\n    };\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n\n//# sourceURL=webpack://zuma-ui/./src/lib/refactorDOM.js?");

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   color: () => (/* binding */ color),\n/* harmony export */   fetchAnimateCss: () => (/* binding */ fetchAnimateCss),\n/* harmony export */   fetchFontAwesome: () => (/* binding */ fetchFontAwesome),\n/* harmony export */   fetchGoogleFonts: () => (/* binding */ fetchGoogleFonts),\n/* harmony export */   fetchTailwind: () => (/* binding */ fetchTailwind)\n/* harmony export */ });\nconst fetchGoogleFonts = function () {\n  return new Promise((res, rej) => {\n    const link = document.createElement(\"style\");\n    link.rel = \"stylesheet\";\n    link.className = \"dependency\";\n    link.crossorigin = \"anonymous\";\n    link.referrerPolicy = \"no-referrer\";\n    document.body.appendChild(link);\n    res(link);\n  });\n};\n\nconst fetchTailwind = function () {\n  return new Promise((res, rej) => {\n    const link = document.createElement(\"script\");\n    link.src =\n      \"https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio\";\n      \n    link.className = \"dependency\";\n    link.async = false;\n    document.body.appendChild(link);\n    res(link);\n  });\n};\nconst fetchFontAwesome = function () {\n  return new Promise((res, rej) => {\n    const link = document.createElement(\"link\");\n    link.href =\n      \"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\";\n    \n    link.rel = \"stylesheet\";\n    link.className = \"dependency\";\n    link.crossorigin = \"anonymous\";\n    link.referrerPolicy = \"no-referrer\";\n    document.body.appendChild(link);\n    res(link);\n  });\n};\n\nconst fetchAnimateCss = function () {\n  return new Promise((res, rej) => {\n    const link = document.createElement(\"link\");\n\n    link.rel = \"stylesheet\";\n    link.href =\n      \"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css\";\n    link.className = \"dependency\";\n    link.referrerPolicy = \"no-referrer\";\n    document.body.appendChild(link);\n    res(link);\n  });\n};\n\nconst color = {\n  primary500: \"blue-500\",\n  primary700: \"blue-700\",\n  primary300: \"blue-300\",\n  primary100: \"blue-100\",\n  blue500: \"blue-500\",\n  blue300: \"blue-300\",\n  black: \"black\",\n  white: \"white\",\n  grey500: \"grey-500\",\n  grey300: \"grey-300\",\n};\n\n\n//# sourceURL=webpack://zuma-ui/./src/lib/utils.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_refactorDOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/refactorDOM.js */ \"./src/lib/refactorDOM.js\");\n/* harmony import */ var _Zuma_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Zuma.js */ \"./src/Zuma.js\");\n/* harmony import */ var _ConfigAssistance_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigAssistance.js */ \"./src/ConfigAssistance.js\");\n\n\n\n\n\nconst App = (launcher, config) => {\n  const zuma = new _Zuma_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](launcher);\n  const e = new _ConfigAssistance_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](zuma);\n  e.setConfig(config);\n  /**\n   * Should user decide to change device theme, we should update config.isDarkTheme to their peferred choice\n   **/\n\n  window\n    .matchMedia(\"(prefers-color-scheme: dark)\")\n    .addEventListener(\"change\", (event) => {\n      e.setConfig({\n        ...e.getConfig(),\n        isDarkTheme: event.matches,\n      });\n      (0,_lib_refactorDOM_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e.getConfig());\n      e.startApp();\n    });\n\n  (0,_lib_refactorDOM_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e.getConfig());\n  return e;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n\n//# sourceURL=webpack://zuma-ui/./src/main.js?");

/***/ }),

/***/ "./src/pages/UserInfoCollectionForm.js":
/*!*********************************************!*\
  !*** ./src/pages/UserInfoCollectionForm.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ \"./src/lib/utils.js\");\n/* harmony import */ var _lib_Intent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Intent.js */ \"./src/lib/Intent.js\");\n\n\n\n\nconst EnquiryForm = function ({ frame, context }) {\n  frame\n    .nextNode(\"Please fill this form before proceeding.\")\n    .setCss(`m-3 p-px text-center text-yellow-600 rounded-full`);\n\n  const {\n    form,\n    inputs: [username, password, description],\n    submitButton,\n    onSubmit: handleLoginFormSubmit,\n  } = frame.nextForm(\"/api/bot\", \"get\", [\n    {\n      errorField: \"I will address you by this name\",\n      name: \"fullname\",\n      placeholder: \"Fullname\",\n    },\n    { name: \"email\", placeholder: \"Email\" },\n    {\n      name: \"description\",\n      placeholder: \"Describe your request\",\n      use: \"textarea\",\n      rows: 5,\n      cols: 5,\n    },\n  ]);\n\n  form.setCss(\"rounded-md m-auto block p-5\");\n\n  username.inputEl.setCss(\n    \"p-5 text-black bg-slate-300/20 border-none rounded-full outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm\"\n  );\n  username.errorField.setCss(\"mb-5 py-px text-orange-400 text-xs text-center\");\n\n  password.inputEl.setCss(\n    \"p-5 text-black bg-slate-300/20 border-none rounded-full outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm mb-4\"\n  );\n  // password.errorField.setCss(\"mb-5 py-px text-orange-600/30 text-xs\")\n\n  description.inputEl.setCss(\n    \"p-5 text-black bg-slate-300/20 border-none rounded-lg outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm\"\n  );\n  //username.errorField.setCss(\"mb-5 py-px text-orange-600/30 text-xs\")\n\n  submitButton.setCss(\n    `p-3 text-slate-500 uppercase bg-black/10 border-none rounded-full outline-none mt-10 mx-auto w-full shadow-lg font-bold`\n  );\n\n  handleLoginFormSubmit(async (formData, e) => {\n    e.preventDefault();\nif(!(formData.get(\"fullname\").trim())) return (username.errorField.innerHTML = \"<b>This field is important</b>\")\n    const { Activity } = new _lib_Intent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().createActivity();\n    const { default: Index } = await __webpack_require__.e(/*! import() */ \"src_pages_Index_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./Index.js */ \"./src/pages/Index.js\"));\n    Activity.createChildren(Index, formData);\n    //setTimeout(() =>\n    Activity.manager.destroy(Activity.prev);\n    //, 1000);\n  });\n  context.removeFooter();\n  return form;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EnquiryForm);\n\n\n//# sourceURL=webpack://zuma-ui/./src/pages/UserInfoCollectionForm.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "zuma-ui:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkzuma_ui"] = self["webpackChunkzuma_ui"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;