"use strict";
import { createNode } from "./lib/common.js";
import {
  fetchTailwind,
  fetchFontAwesome,
  fetchAnimateCss,
  fetchGoogleFonts,
} from "./lib/utils.js";
import EException from "./exception/EmbeddableException.js";

export const createStyle = async () => {
  let dependencies;
  if ((dependencies = document.querySelectorAll(".dependency"))) {
    dependencies.forEach((d) => d.remove());
  }
  try {
    /*fetchTailwind()
      .then(() => fetchFontAwesome())
      .then(() => fetchAnimateCss())
      .then(() => fetchGoogleFonts())
      .then((d) => console.log(d));*/
    const res = await Promise.allSettled([
     // fetchTailwind(),
      fetchFontAwesome(),
      fetchAnimateCss(),
      fetchGoogleFonts(),
    ])
return res.filter(i=>i.status === "fulfilled").length > 0
      
 // )

       /*.addEventListener("load", async (e)=>{
        const j =  await Promise.resolve(i)
        console.log(j)
         i++
       })
         */
         
  } catch (e) {
    throw new EException(e);
  }
};
export const createLauncher = ({ pos, tw, config }) => {
 // console.log(config)
  const btn = createNode("button");
  btn.type = "button";
  const prefix = config.prefix
  const y = [ 
   ...pos.split(" "),
    `${prefix}p-5`,
    `${prefix}z-2`,
    `${prefix}rounded-full`,
    `fa fa-inbox`,
    `${prefix}text-2xl`,
    `${prefix}fixed`,
    `${prefix}shadow-2xl`]
  const s = new Set();
  y.forEach(o=>s.add(o))
  if (tw?.trim()) {
    s.add(...tw?.trim()?.split(" "));
  }
  btn.setCss([...s]?.join(" "));
  return btn;
};
