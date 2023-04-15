"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkchatbot"] = self["webpackChunkchatbot"] || []).push([["src_pages_ChatUiWelcomePage_js"],{

/***/ "./src/pages/ChatUiWelcomePage.js":
/*!****************************************!*\
  !*** ./src/pages/ChatUiWelcomePage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_Intent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Intent.js */ \"./src/lib/Intent.js\");\n/* harmony import */ var _files_bg_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files/bg.png */ \"./src/files/bg.png\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.js */ \"./src/config.js\");\n/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils.js */ \"./src/lib/utils.js\");\n\n\n;\n\n\n// Pages\n//import GetStarted from './GetStarted.js'\n\n\n\n\nconst ChatUiWelcomePage = function({frame, context}){\n     //context.setFrameColor('red-500')\n\n  const showcase = frame.nextNode(null, 'div')\n  showcase.setCss('h-full w-full flex flex-col justify-around items-center')\n  \n  const container = showcase.nextNode(null,'div')\n  container.setCss('flex flex-col justify-center items-center py-5 text-white text-center space-y-5')\n  \n  container.nextNode(`Hi!`)\n  .nextNode(`I'm ${_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].appName}`,'h1')\n  .setCss('my-3 text-4xl font-bold')\n\n  const bg = new Image(200,200)\n  bg.src = _files_bg_png__WEBPACK_IMPORTED_MODULE_1__;\n  bg.setCss('m-3 object-fit rounded-full')\n  bg.onload=function (e){\n    bg.src = e.target.currentSrc;\n  }\n  container.appendChild(bg)\n\ncontainer.nextNode('How can i help you today?').setCss('my-5')\n\nconst op = container.nextNode(null,'select')\n op.add(new Option('I want to...', 'nothing',true))\n op.add(new Option('Talk to zuma', 'zuma',true))\n op.add(new Option('Make Enquiries', 'enquire',true))\n op.add(new Option('Read FAQs', 'faqs',true))\n op.add(new Option(`Know how to use ${_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].appName}`, 'faqs',true))\n op.add(new Option('Say Hello', 'hello',true))\n op.add(new Option('Do something not listed here', 'chat',true))\n \n op.setCss('form-select py-2 px-3 rounded-full font-bold text-white bg-blue-700 text-center shadow-lg w-full outline-none border-none max-w-full')\n \nop.addEventListener('change', async function (e){\n  const option = e.target;\n  switch(option.value){\n    case 'zuma':\n      const {default: zuma} = await __webpack_require__.e(/*! import() */ \"src_pages_Zuma_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./Zuma.js */ \"./src/pages/Zuma.js\"))\n  const {Activity}=(new _lib_Intent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]).createActivity()\n      Activity.createChildren(zuma)\n      break;\n  }\n})\n  return showcase;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatUiWelcomePage);\n\n//# sourceURL=webpack://chatbot/./src/pages/ChatUiWelcomePage.js?");

/***/ })

}]);