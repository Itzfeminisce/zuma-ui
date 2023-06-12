"use strict";
import {prefix} from "../tailwind.config.js"
 const appPrefix =  prefix || ""
 
const config = {
  prefix:appPrefix,
  animation: "animate__fadeIn",
  appName: "Zuma",
  file: "zuma.config.js",
  fonts: {
    primary: `'Sedgwick Ave Display', cursive`,
    secondary: `'Archivo', sans-serif`,
  },
  /**
   *  @prop isDarkTheme bool
   * Dynamically detect the current color-scheme of user
   * Must not be overriden
   **/
  isDarkTheme: window.matchMedia &&
   window.matchMedia("(prefers-color-scheme: dark)").matches,

  /**
   * Feel free to apply theming classes as desired
   * Valid tailwind classes or predefined classes work too
   * @prop dark Array<String>
   * @prop light Array<String>
   **/
  theme: {
    dark: [`${prefix}bg-slate-700`, `${prefix}text-white`],
    
    /**
     * Passing tailwindcss gradient colors will kill your app and make it slow as hell. 
     * theme.*: ["bg-gradient-to-b","from-transparent","via-slate-200","to-slate-300", text-black"],
     * */
   light: [`${prefix}bg-white`,`${prefix}text-black`],
  },
  /*colors: {
    appBgColor: "slate-700",
    appTextColor:"white"
  },*/
  /**
   * You can style our launcher button to suit your desire
   *
   * position:"bottom-left",
   * position:pos=>pos["bottom-left"],
   * tailwind:"text-yellow-700 bg-red-300 rounded-full"
   *
   * Todo: Fix bugs for repeated tailwind classes
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
