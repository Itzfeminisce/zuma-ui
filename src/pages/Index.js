"use strict";
import Intent from "../lib/Intent.js";

//let config = JSON.parse(window.localStorage.getItem("clientConfig"))
//import config from "../config.js";
import BgImage from "../files/bg.png";
import { createNode } from "../lib/common.js";
import { color } from "../lib/utils.js";

const Index = function ({ frame, context, data }) {
// let messageTracker = {index:0};
//console.log(context )
 const BOT = [
  {
    id:9999999999,
    title:"Whats the plan today?",
    suggests:[
      "Read Docs",
      "Test App",
      "Get CDN",
      "Generate Starter app",
      "See more",
      "Just chilling 😇",
      ]
  },
  {
    id:0,
    title:"Great choice! A better way of understanding any project is by taking a glance at the documentations. However, the choice is yours.",
    suggests:[
      "Get Started",
      "APIs",
      "Configuration File",
      "What is Intent?",
      "Quit",
      ]
  },
  {
    id:6,
    title:"Our app is designed with full customisation in mind. You should started by appending our CDN into your page and see the magic",
    suggests:["Get CDN","Generate Starter Kit","Return"]
  }
  ]
const BOT_SUGGESTS = BOT.map(bot=>bot.suggests).flat(Infinity)


  frame.setCss("z-2 !bg-white user-select-none");

  //console.log(context.config)
  const showcase = frame.nextNode(null, "div");
  showcase.setCss(
    "h-full w-full flex flex-col justify-around items-center bg-transparent"
  );

  const container = showcase.nextNode(null, "div");
  container.setCss(
    "flex flex-col justify-center items-center py-5 w-full h-full flex flex-col justify-between bg-transparent"
  );

  const msgArea = container.nextNode();
  msgArea.setCss("max-h-[90%] w-[100%] bg-transparent overflow-y-auto");

 
 /* useMessage({ msgArea, type: "client", message: "Itzfeminisce" });
  useMessage({
    msgArea,
    message: "Okay Itzfeminisce, How can i help you today?",
  });
*/
  const formContainer = container.nextNode();
  const sgg = formContainer.nextNode();
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

  sgg.setCss("bg-transparent py-2");
  useMessage({ msgArea, suggestionArea:sgg });

/*
  useMessage({ msgArea: sgg, message: "Hello!", type: "suggest" });
  useMessage({ msgArea: sgg, message: "That's Awesome!", type: "suggest" });
  useMessage({ msgArea: sgg, message: "👏", type: "suggest" });
*/

  formContainer.setCss("sticky bottom-0 mx-auto inset-x-0 bg-transparent");

  form.setCss("flex justify-between items-center bg-transparent");
  ticket.inputEl.setCss("fa fa-plus p-3 text-slate-500 font-bold rounded-full");
  message.inputEl.setCss(
    "bg-slate-100 rounded-full border-0 p-3 shadow-sm placeholder:text-black/70 mx-1"
  );
  submitButton.textContent = "";
  submitButton.setCss(
    "fa fa-paper-plane !bg-blue-500 text-white rounded-full p-3"
  );

  ticket.inputEl.addEventListener("click", handlePickAttachment);

// The furst time submitting a message
handleBeginMessage((data,e) => {
    //useMessage({ msgArea, message: data.get("message"), type: "client" });
   handleMessage(data)
   e.target.reset()
   // e.target.form.reset()
   sgg.nextNode(`${context?.config.appName} is typing...`).setCss("!bg-transparent font-small text-green-500 m-px")
 setTimeout(()=>{
   getSuggestedMessageAndResponses(BOT,9999999999,msgArea,sgg,useMessage)
 }
    ,2500)
   });
   
   
  function handleMessage(data) {
    //console.log(data.get("message"))
    const message = data.get("message")
  //const suggestIndex = data.get("suggestIndex")
  /*  setTimeout(() => {
      useMessage({ msgArea, message: "Working on it...", type: "bot" });
    }, 2500);
    */
    sgg.clearChildren()
    
    if(message.startsWith("data:")){
     const img = createNode("img",{
       attributes:{
         src:message,
         width:200,
         height:200,
         alt:"attachment",
       }
     })
     img.setCss("mb-5")
    msgArea.appendChild(img)
     img.scrollIntoView()
    setTimeout(()=>useMessage({ msgArea, message:"Working on it...", type: "bot"}),2500);
    return;
    }
    useMessage({ msgArea, message, type: "client"});
  //  msgArea.scrollIntoView()
  }
  
  function handlePickAttachment() {
    const file = createNode("input", {
      attributes: [{
        key: "type",
        value: "file",
      },{
        key:"name",
        value:"attachment",
      }],
    });
    file.click();
    file.addEventListener("change", (e) => {
      const fr = new FileReader()
      fr.readAsDataURL(e.target.files[0])
     const map = new Map()
     fr.onload = ()=>{
       map.set("message",fr.result)
   handleMessage(map)
     }
    });
  }
function getSuggestedMessageAndResponses(bot,suggestIndex,msgArea, suggestionArea, useMessage){
    //setTimeout(() => {
      const message = bot.filter(b=>b.id === suggestIndex).at(0)
      
       useMessage({ msgArea,message:message.title, type: "bot" });
       
       sgg.clearChildren()
       message.suggests.forEach((s)=>{
      //console.log(s,i++)
       useMessage({ msgArea:suggestionArea, message: s, type: "suggest"});
       })
       //bot.nextMessageIndex++
      //messageTracker.index++;
  //  }, 2500);
}
 
  function useMessage({
    message = `Hi <b>${data.get("fullname").ucfirst()}</b>! My name is ${context?.config.appName}. What's up with you?`,
    type = "bot",
    msgArea,
   suggestionArea = null
  }) {
    let l, r, cl, cr;
    const classes = {
      bot: "!bg-slate-500 text-shadow-black/40 py-1 px-2 text-white rounded-lg text-base/7 inline-block",
      client:
        "!bg-blue-700 text-base/7 py-1 px-2 text-white rounded-lg inline-block self-right",
      suggest:
        "bg-white py-1 px-2 text-black rounded-lg text-smaller m-1 inline-block shadow-lg border-slate-300",
    };

    switch (type) {
      case "bot":
        // Bot
        l = msgArea.nextNode();
        l.setCss("bg-transparent mb-5");
        cl = l.nextNode(message, "p");
        cl.setCss(classes.bot);
        (suggestionArea && suggestionArea.nextNode("I will address you by this name.","span").setCss("text-center block bg-transparent text-blue-600 p-1 text-sm"))
       // const map = new Map()
       // map.set("message","bot is aking for name")
       // map.set("givenName","")
       // handleMessage(map)
        l.scrollIntoView();
        break;
      case "client":
        // client
        r = msgArea.nextNode();
        r.setCss("bg-transparent mb-5 flex");
        cr = r.nextNode(message, "p");
        cr.setCss(classes.client);
  sgg.clearChildren()
setTimeout(()=>{
  getSuggestedMessageAndResponses(BOT,BOT_SUGGESTS.indexOf(message),msgArea,sgg,useMessage)
    r.scrollIntoView();
},2500)
        break;
      case "suggest":
        // client
        r = msgArea.nextNode(message, "span");
        r.setCss(classes.suggest);
//sgg.clearChildren()
     //   r.scrollIntoView();
        r.addEventListener("click", function (e) {
          const m = new Map();
          m.set("message", message);
        //  sgg.clearChildren()

       //   if(suggestIndex) m.set("suggestIndex",suggestIndex)
          handleMessage(m, e);
          r.scrollIntoView()
        });
        break;
    }
  }

  context.removeFooter();
  return showcase;
};

export default Index;
