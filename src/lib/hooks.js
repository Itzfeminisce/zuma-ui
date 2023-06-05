const config = JSON.parse(window.localStorage.getItem("clientConfig"))

export { useState, useSetInterval } from "../lib/IntentManager.js";

export const useImageUrl = function (imgFile, w, h) {
  const img = new Image(w || 200, h || 200);
 img.src = imgFile
  img.onload = function (e) {
    img.src = e.target.currentSrc;
  };
  return img;
};

export const useWindow = () => {
 const app = window[config?.appName] = window[config?.appName] || {};

  return app //window[config?.appName];
};

export const useConfig = ()=>{
  return config
}
