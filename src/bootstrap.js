"use strict";
import { createNode } from "./lib/common.js";
import {
  fetchTailwind,
  fetchFontAwesome,
  fetchAnimateCss,
  fetchGoogleFonts,
} from "./lib/utils.js";
import EException from "./exception/EmbeddableException.js";

export const createStyle = async (clb) => {
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
      fetchTailwind(),
      fetchFontAwesome(),
      fetchAnimateCss(),
      fetchGoogleFonts(),
    ]);

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
export const createLauncher = ({ pos, tw }) => {
  const btn = createNode("button");
  btn.type = "button";
  const s = new Set([
    `fixed`,
    `${pos}`,
    `p-5`,
    `rounded-lg`,
    `fa fa-inbox`,
    `text-2xl`,
    `shadow-2xl`,
  ]);
  if (tw?.trim()) {
    s.add(...tw?.trim()?.split(" "));
  }
  btn.setCss([...s]?.join(" "));
  return btn;
};
