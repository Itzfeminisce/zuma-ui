import { c as config, g as getById, i as img } from './main-c3a727b2.js';

const useImageUrl = function (imgFile, w, h) {
  const img = new Image(w || 200, h || 200);
 img.src = imgFile;
  img.onload = function (e) {
    img.src = e.target.currentSrc;
  };
  return img;
};

const Zuma = function ({ frame, context }) {
  const showcase = frame.nextNode().setCss('flex flex-col items-center justify-between h-full');

  const header = showcase.nextNode()    .setCss("sticky top-0 bg-slate-900 flex-1");
  const head = header
    .nextNode()
    .setCss(
      `flex justify-between items-center w-full pl-1 bg-inherit bg-slate-900`
    );

context.getContext((ctx) => {
    ctx.getNavigationBar().setCss("sticky top-0");
    ctx.getNavigationElements().map((el) => el.remove());
    ctx.getAvailableElementsContainer().replaceWith(head);
  });


  // left container
  head.nextNode(`ZUMA`, "h1").setCss("font-bold text-white text-lg")
  .nextNode(null,'span',{id:'isTyping'})
  .setCss('text-sm px-2 font-light');
  
  
  // right container
  const cntr = head.nextNode();
  const img$1 = useImageUrl(img, 80, 80).setCss("p-0 m-0");
  cntr.appendChild(img$1);

//header.nextNode('Typically respond in secs.','p').setCss('text-center text-white font-light')
  
  const body = showcase.nextNode(null, "div");
  body.setCss("min-h-full overflow-y-scroll py-5");

  const bContainer = body.nextNode().setCss("space-y-5 flex flex-col");

  bContainer
    .nextNode("Hey!, I'm Zuma. How can i help you today?", "p")
    .setCss("prose font-bold text-lg p-3 bg-blue-100/10 border-l-4 border-l-blue-700 text-blue-700");

  const bottom = showcase.nextNode(null, "div").setCss(`sticky bottom-0 flex-1 bg-${config?.colors?.appBgColor}`);

  const form = bottom.nextNode();
  form.setCss(
    `flex justify-between items-center bg-transparent p-3`
  );
  const txt = form.nextNode(null, "input", {
    type: "text",
    placeholder: "I want to....",
  });
  txt.setCss("px-3 py-1 rounded-full bg-white/10 text-white text-lg");

  const submit = form.nextNode("Send", "button", { type: "button" });
  submit.setCss("px-3 text-white rounded-full text-lg mx-2");

  submit.addEventListener("click", function () {
    const v = txt.value.trim();
    bContainer
      .nextNode(v, "p")
      .setCss("prose font-bold text-lg p-3 bg-white/10 border-l-4 border-l-white text-white");
    getById('isTyping').textContent = "Typing...";
    
    const tm = setTimeout(() => {
      bContainer
        .nextNode("Sorry, I've not been set up to respond correctly. Kindly check back in a while 😉😉", "p")
        .setCss("prose font-bold text-lg p-3 bg-white/10 border-l-4 border-l-blue-700 text-blue-700");
      clearTimeout(tm);
getById('isTyping').textContent = "";  

bContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, 1500);
    txt.value = "";
    
bContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  });



context.getContext((ctx) => {
    ctx.footer.remove();
  });



  return showcase;
};

export { Zuma as default };
