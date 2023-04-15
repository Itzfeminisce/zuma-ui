"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkchatbot"] = self["webpackChunkchatbot"] || []).push([["src_pages_LoginForm_js"],{

/***/ "./src/pages/LoginForm.js":
/*!********************************!*\
  !*** ./src/pages/LoginForm.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ \"./src/lib/utils.js\");\n/* harmony import */ var _lib_Intent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Intent.js */ \"./src/lib/Intent.js\");\n/* harmony import */ var _lib_hooks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/hooks.js */ \"./src/lib/hooks.js\");\n/* harmony import */ var _GetStarted_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GetStarted.js */ \"./src/pages/GetStarted.js\");\n\n;\n\n\n\n\n\nlet [count, setCount] = (0,_lib_hooks_js__WEBPACK_IMPORTED_MODULE_2__.useState)(3)\n\nconst LoginForm = function({ frame, context, data }) {\n\n  frame.nextNode(data?.message || 'Log into your account (Trial Left: 3)')\n    .setCss(`text-${data?'red-500':'white'} text-center mx-auto p-5 mt-10`)\n\n  const {\n    form,\n    inputs: [username, password, description],\n    submitButton,\n    onSubmit: handleLoginFormSubmit\n  } = frame.nextForm('/api/bot', 'get', [\n    { label: '', name: 'username', placeholder: 'Type \"demo\"' },\n    { label: '', name: 'password', placeholder: 'Type \"12345\"' },\n      ])\n\n  form.setCss('rounded-md m-auto block p-5')\n\n  username.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg')\n  password.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg')\n  submitButton.setCss(`p-5 text-white bg-${_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg`)\n\n\n\n  handleLoginFormSubmit((formData, e) => {\n    e.preventDefault()\n\n    try {\n\n      // Dummy data\n      const username = formData.get('username'),\n        password = formData.get('password')\n\n      const authenticated = (username === 'demo' && password === '12345') ? true : false\n\n      let nextPage, response;\n\n      if (authenticated) {\n        nextPage = _GetStarted_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n        response = 'Login Successful '\n      } else {\n\n        if (count <= 0) {\n          alert(\"You have exceeded the trial count. browser will now be reloaded.\")\n          window.location.reload()\n        }\n\n        nextPage = LoginForm\n        response = {\n          ok: authenticated,\n          trial: count,\n          message: `Please supply the correct information (Trial Left: ${count})`\n        }\n        setCount(--count)\n\n      }\n\n      const { Activity } = (new _lib_Intent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).createActivity()\n      Activity.createChildren(nextPage, response)\n    } catch (e) {\n      console.log(e)\n    }\n  })\n\n  return form;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginForm);\n\n//# sourceURL=webpack://chatbot/./src/pages/LoginForm.js?");

/***/ })

}]);