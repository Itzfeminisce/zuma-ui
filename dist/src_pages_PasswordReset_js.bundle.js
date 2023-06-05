"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkzuma_ui"] = self["webpackChunkzuma_ui"] || []).push([["src_pages_PasswordReset_js"],{

/***/ "./src/pages/PasswordReset.js":
/*!************************************!*\
  !*** ./src/pages/PasswordReset.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ \"./src/lib/utils.js\");\n/* harmony import */ var _lib_Intent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Intent.js */ \"./src/lib/Intent.js\");\n\n\n\n\nconst PasswordReset = function ({ frame, context, data }) {\n  frame\n    .nextNode(\n       data?.message || \"Enter registered email!\"\n    )\n    .setCss(\n      `text-white text-center mx-auto p-5 mt-10`\n    );\n\n  const {\n    form,\n    inputs: [username],\n    submitButton,\n    onSubmit: handleLoginFormSubmit,\n  } = frame.nextForm(\"/api/bot\", \"get\", [\n    { label: \"\", name: \"username\", placeholder: 'Type \"demo@gmail.com\"'},\n  ]);\n\n  form.setCss(\"rounded-md m-auto block p-5\");\n\n  username.inputEl.setCss(\n    \"p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg\"\n  );\n  \n  submitButton.setCss(\n    `p-5 text-white bg-${_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg mb-5`\n  );\n\n\n  handleLoginFormSubmit((formData, e) => {\n    e.preventDefault();\n    try {\n      // Dummy data\n      const username = formData.get(\"username\");\n\n      const authenticated = username === \"demo@gmail.com\" \n\n      let nextPage = PasswordReset, response;\n\n      if (authenticated) {\n        response = {authenticated, message: `Password link has been sent to ${username}` };\n      } else {\n        response = {\n          authenticated,\n          message: `Please supply your correct email`,\n        };\n        //setCount(count <= 0 ? 0 : --count);\n      }\n\n      const { Activity } = new _lib_Intent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().createActivity();\n      Activity.createChildren(nextPage, response);\n      Activity.manager.destroy(Activity.prev,1000)\n    } catch (e) {\n      console.log(e);\n    }\n  });\n\n  return form;\n};\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PasswordReset);\n\n\n//# sourceURL=webpack://zuma-ui/./src/pages/PasswordReset.js?");

/***/ })

}]);