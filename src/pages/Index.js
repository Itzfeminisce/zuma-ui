"use strict";
import { format } from "date-fns";
import Intent from "../lib/Intent.js";

//let config = JSON.parse(window.localStorage.getItem("clientConfig"))
//import config from "../config.js";
import BgImage from "../files/bg.png";
import { createNode, writeStatus, urlExtract, copyToClipboard, redirectTo} from "../lib/common.js";
import { color } from "../lib/utils.js";

//extractUrl('GOTO:https://foo.bar')
const Index = function ({ frame, context, data }) {
  const BOT = context?.config?.CHATS;
  const BOT_SUGGESTS = BOT.map((b) => b.suggests || []);


  frame.setCss("z-2 user-select-none");

  const showcase = frame.nextNode();
  showcase.setCss(
    "h-full w-full flex flex-col justify-around items-center bg-transparent-"
  );

  const container = showcase.nextNode();
  container.setCss(
    "flex flex-col justify-center items-center py-5 w-full h-full flex flex-col justify-between bg-transparent-"
  );

  const msgArea = container.nextNode();
  msgArea.setCss("max-h-[90%] w-[100%] bg-transparent- overflow-y-auto scrollbar-none");

  const formContainer = container.nextNode();
  const sgg = formContainer.nextNode();
  const computer = writeStatus(sgg);

  const {
    form,
    inputs: [ticket, message],
    submitButton,
    onSubmit: handleBeginMessage,
  } = formContainer.nextForm(
    "/api/welcome",
    "get",
    [
      {
        label: "",
        name: "ticket",
        use: "button",
      },
      {
        label: "",
        name: "message",
        placeholder: "How are you?",
      },
    ],
    true
  );

  sgg.setCss("bg-transparent- py-2");
  useMessage({ msgArea, suggestionArea: sgg });

  formContainer.setCss("sticky bottom-0 mx-auto inset-x-0 bg-transparent-");

  form.setCss("flex justify-between items-center bg-transparent-");
  ticket.inputEl.setCss("fa fa-plus p-3 text-slate-500 bg-slate-200 font-bold rounded-full");
  message.inputEl.setCss(
    "outline-none !bg-slate-300/20 !text-black text-shadow-white rounded-full border-0 p-3 shadow-sm placeholder:text-black/70 mx-1"
  );
  submitButton.disabled = true;
  submitButton.textContent = "";
  submitButton.setCss(
    "fa fa-paper-plane !bg-blue-500 text-white rounded-full p-3"
  );
  ticket.inputEl.addEventListener("click", handlePickAttachment);
  message.inputEl.addEventListener("keyup", (e) => {
    if (e.target.value?.trim()?.length > 0) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });

  // The furst time submitting a message
  handleBeginMessage((data, e) => {
    handleMessage(data);

    /*   sgg
      .nextNode(`${context?.config.appName} is typing...`)
      .setCss("--bg-transparent- font-small text-green-500 m-px");
      */
    // const doneTyping =  isTyping(sgg.nextNode("","span").setCss("text-lg text-green-500 px-px")
    computer.isTyping();
    setTimeout(() => {
      getSuggestedMessageAndResponses(BOT, -1, msgArea, sgg, useMessage);
      // computer.doneTyping()
    }, 4000);
  });

  function handleMessage(data) {
    //console.log(data.get("message"))
    const message = data?.get("message");
    
    if (!message) return computer.doneTyping();
    
    sgg.clearChildren();
    
   if(message.toLowerCase().includes('copy:')){
     useMessage({ msgArea:sgg, message:"<i class='text-xs text-green-500'>COPIED!</i>", type: "suggest" });
     computer.doneTyping()
   return copyToClipboard(urlExtract(message))
   }
   
   if(message?.toLowerCase()?.includes('goto:')){
    return redirectTo(urlExtract(message))
   }
   
    if (message.startsWith("data:")) {
      const img = msgArea.nextNode(null,"img", {
          src: message,
          width: 200,
          height: 200,
          alt: "attachment",
      });
     img.setCss(`mb-5 after:absolute after:content-[' '] after:w-[100%] after:h-[100%] after:top-0 after:bottom-0 after:right-0 after:left-0 after:bg-red-500 after:z-99 bg-blue-500 p-3`);
      img.scrollIntoView();
      setTimeout(
        () => useMessage({ msgArea, message: "Working on it...", type: "bot" }),
        2500
      );
      return;
    }
    useMessage({ msgArea, message, type: "client" });
    //  msgArea.scrollIntoView()
  }

  function handlePickAttachment() {
    const file = createNode("input", {
      attributes: [
        {
          key: "type",
          value: "file",
        },
        {
          key: "name",
          value: "attachment",
        },
      ],
    });
    file.click();
    file.addEventListener("change", (e) => {
      const fr = new FileReader();
      fr.readAsDataURL(e.target.files[0]);
      const map = new Map();
      fr.onload = () => {
        map.set("message", fr.result);
        handleMessage(map);
      };
    });
  }
  function getSuggestedMessageAndResponses(
    bot,
    suggestIndex,
    msgArea,
    suggestionArea,
    useMessage
  ) {
    const message = bot.filter((b) => b.id === suggestIndex).at(0);
    useMessage({ msgArea, message: message.title, type: "bot" });

    sgg.clearChildren();
    Object.values(message.suggests).forEach((s) => {
      if(s){
      useMessage({ msgArea: suggestionArea, message: s, type: "suggest" });
      }
    });
    computer.doneTyping();
  }

  function useMessage({
    message = `Hi <b>${data?.get("fullname").ucfirst()}</b>! My name is ${
      context?.config.appName
    }. What's up with you?`,
    type = "bot",
    msgArea,
    suggestionArea = null,
  }) {
    let l, r, cl, cr;
    const NOW = format(Date.now(), "p");
    // console.log(NOW)
    const classes = {
      client: "!bg-blue-500 text-shadow-black/40 py-1 px-2 text-white rounded-lg text-base/7 inline-block",
      bot:
        `!bg-[#eeeeee] text-base/7 py-1 px-2 !text-black rounded-lg inline-block`,
      suggest:
        "!bg-white !text-black py-1 px-2 text-black rounded-lg text-smaller m-1 inline-block shadow-sm",
    };
    switch (type) {
      case "bot":
        // Bot
        l = msgArea.nextNode();
        l.setCss("bg-transparent- mb-5");
        cl = l.nextNode(message, "p");
        getDeliveryDate(cl,NOW)
        cl.setCss(classes.bot);
        l.scrollIntoView();
        break;
      case "client":
        // client
        r = msgArea.nextNode();
        r.setCss("bg-transparent- mb-5 flex");
        cr = r.nextNode(message, "p");
        getDeliveryDate(cr,NOW)
        cr.setCss(classes.client);
        sgg.clearChildren();
        setTimeout(() => {
          getSuggestedMessageAndResponses(
            BOT,
            +getIndex(BOT_SUGGESTS, message),
            msgArea,
            sgg,
            useMessage
          );
          r.scrollIntoView();
        }, 2500);
        break;
      case "suggest":
        // client
        r = msgArea.nextNode(message, "span");
        r.setCss(classes.suggest);
        r.addEventListener("click", function (e) {
          const m = new Map();
          m.set("message", message);
          computer.isTyping();
          handleMessage(m, e);
          r.scrollIntoView();
        });
        break;
    }
  }

  context.removeFooter();
  return showcase;
};

function getIndex(arr, pin) {
  const r = {};
  arr.map((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === pin) r["result"] = key;
    });
  });
  return r.result;
}
function getDeliveryDate(c,t){
 const statusDiv = c.nextNode()
  .setCss(
          "font-bold !text-black/50 text-xs pt-2 !bg-transparent text-shadow-black flex justify-between items-center space-x-5"
        );
 
  statusDiv.nextNode(t,"span")
        getDeliveryStatus(statusDiv)
}
function getDeliveryStatus(c){
  c.nextNode(null,"span").setCss("!text-green-500 !bg-transparent fa fa-check")
}
export default Index;
