"use strict";
import Intent from "../lib/Intent.js";


import config from "../config.js";
import BgImage from "../files/bg.png";
import { color } from "../lib/utils.js";


const Index = function ({ frame, context }) {
  const showcase = frame.nextNode(null, "div");
  showcase.setCss("h-full w-full flex flex-col justify-around items-center");

  const container = showcase.nextNode(null, "div");
  container.setCss("flex flex-col justify-center items-center py-5");

  const bg = new Image(400, 400);
  bg.src = BgImage;
  bg.setCss("m-3 object-fit");
  bg.onload = function (e) {
    bg.src = e.target.currentSrc;
  };
  container.appendChild(bg);

  container
    .nextNode(`Say hi to ${config.appName}`, "h1")
    .setFontFamily(config.fonts.secondary)
    .setCss(`text-white text-2xl uppercase font-bold prose m-5`);

  const getStarted = container.nextNode("Get Started", "button");

  getStarted.setCss(
    `flex justify-center items-center text-white text-lg font-bold font-impact bg-${color.primary700} rounded-full py-1 px-5 shadow-lg mt-5`
  );

  getStarted.addEventListener("click", async function () {
    const { Activity } = new Intent().createActivity();
    //const loggedin = true;

    //const {default:LoginForm} = await import('./LoginForm.js')
    const { default: GetStarted } = await import("./GetStarted.js");

    Activity.createChildren(GetStarted);
    //:LoginForm,(loggedin?'Welcome back':{message:`Please login first`,trial:3,ok:false}))
  });

  const tnc = context.createFooter(
    frame,
    "By continuing, you agree to our terms of use and privacy policies."
  );
  tnc.setCss("text-sm text-center mb-auto text-white prose bg-green-500");

  //context.removeFooter(frame)

  return showcase;
  
};

export default Index;
