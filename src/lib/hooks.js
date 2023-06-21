//import axios from "axios";
const axios = require('axios')
const config = JSON.parse(window.localStorage.getItem("clientConfig"));

export { useState, useSetInterval } from "../lib/IntentManager.js";

export const useImageUrl = function (imgFile, w, h) {
  const img = new Image(w || 200, h || 200);
  img.src = imgFile;
  img.onload = function (e) {
    img.src = e.target.currentSrc;
  };
  return img;
};

export const useWindow = () => {
  const app = (window[config?.appName] = window[config?.appName] || {});

  return app; //window[config?.appName];
};

export const useConfig = () => {
  return config;
};

export const useCsrfToken = () => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const useXhr = async ({ url, data, method = "GET" }) => {
  const req = axios.create({
    baseUrl: "http://127.0.0.1:8000",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": useCsrfToken(),
    },
    timeout:5000
  });
  const res = await req({
    method,
    url,
    data:JSON.stringify(data),
  });
  return res
};

