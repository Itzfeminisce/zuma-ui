const config ={
  prefix:"embeddable",
  animation:'animate__fadeIn',
  appName:"Zuma",
  fonts:{
    primary:`'Sedgwick Ave Display', cursive`,
    secondary:`'Archivo', sans-serif`
  },
  colors:{
    appBgColor: "slate-900"
  }
};

const getById = (id) => document.getElementById(id);

const selectNode = (name) =>{ 
  return document.querySelector(name)
};
const createNode = (name,option) => {
 const el = document.createElement(name);
 if(option instanceof Function){
    return option(el)
  }
  if(option instanceof Object){
    if(options.children){
      el.children = option.children;
    }
  }
  if(typeof option === 'string'){
    el.innerHTML = option;
  }
  return el
};

String.prototype.ucfirst=function (){
  return this.charAt(0).toUpperCase()+this.slice(1,this.length)
};

HTMLElement.prototype.setFontFamily = function(font){
  this.style.fontFamily = font;
  return this
};
HTMLElement.prototype.setCss = function(style) {
  let classList = this.classList;
  style.split(' ').forEach((_cssClass, i) => {
    classList.add(_cssClass.trim());
  });
  this.classList = classList;
  this.classList.add('animate__animated',`${config.animation}`);
  
  this.addEventListener('animationend',function(){
    this.classList.remove(`${config.animation}`);
  });
  return this;
};
HTMLElement.prototype.nextNode= function(textContent = '', nodeName = 'div', attributes = {}){
  const node = createNode(nodeName);
  for(let attribute in attributes){
    const attr = attributes[attribute];
    if(attribute == 'className'){
      attribute = 'class';
    }
    node[attribute] = attr;
  }
  if(!['img','input'].includes(nodeName)){
  node.innerHTML = textContent;
  }
  this.appendChild(node);
  return node;
};


HTMLElement.prototype.nextForm = function (action, method, children=[
  {label:"Username", name:'name1',placeholder:"Type here...",id:"input1"}
  ]){
    
    let label, inputEl, inputs = [], submitButton;
  const form = createNode('form');
  const submit = createNode('button');
  
  submit.type = 'submit';
  form.action = action;
  form.method = method;
  
  children?.forEach((input,i)=>{
  //  for(const attr of input){
          label = createNode('label');

      if(!input?.label){
        label.setAttribute('for',input.name);
      }else {
        label.for = input?.id ?? input.name;
      }
        label.textContent = input?.label?.ucfirst();
   //   }     
       if(input?.use){
          inputEl = createNode(input.use);
switch (input.use) {
  case 'textarea':
    inputEl.rows = input?.rows;
    inputEl.cols = input?.cols;
    break;
}
  }else {
      inputEl = createNode('input');
  }

      inputEl.name = input.name;
      inputEl.placeholder = input.placeholder;
      inputEl.id = input?.id ?? input.name;
      inputEl.setAttribute('type',(input?.type ?? (['password','pwd','pass','passwd'].includes(input?.name?.toLowerCase()))?'password':(['phone','number','digit'].includes(input?.name?.toLowerCase()))?'number':'text'));
    
        
   
      
    label.appendChild(inputEl);
    form.appendChild(label);
      
    inputs.push({label,inputEl});

  });
  submitButton = form.nextNode('Submit','button',{type:'submit'});
  this.appendChild(form);
  return {
    inputs,form,submitButton,
      onSubmit(clb){
        if(typeof clb === 'function'){
          form.addEventListener('submit', function(e){
          clb((new FormData(this)),e);
          });
        }
      }
  }
};

const fetchGoogleFonts = function() {
  return new Promise((res, rej) => {
    const style = document.createElement('style');
style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&family=Sedgwick+Ave+Display&display=swap');
body{
  font-family:'Archivo', sans-serif;
}
`;
document.body.appendChild(style);
   res(style);
  })
};

const fetchTailwind = function() {
  return new Promise(async (res, rej) => {
    const link = document.createElement('script');
    link.src = 'https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio';
    link.className = 'dependency';
link.async = false;
    document.body.appendChild(link);
    res(link);
  })
};
const fetchFontAwesome = function() {
  return new Promise((res, rej) => {
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.className = 'dependency';
    link.crossorigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.body.appendChild(link);
    res(link);
  })
};

const fetchAnimateCss = function() {
  return new Promise((res, rej) => {
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    link.className = 'dependency';
    link.referrerPolicy = "no-referrer";
    document.body.appendChild(link);
    res(link);
  })
};

const color = {
  primary500: 'blue-500',
  primary700: 'blue-700',
  primary300:'blue-300',
  primary100:'blue-100',
  blue500: 'blue-500',
  blue300: 'blue-300',
  black: 'black',
  white: 'white',
  grey500: 'grey-500',
  grey300: 'grey-300',
};

class EException extends Error {
  constructor(message){
    super(message);
    
    this.name = "EmbeddableException: ";
    
    console.log(
      '................................',
      `\nException: ${this.name} \nMessage: ${this.message} \nStack: ${this.stack}\n`,
      '.................................'
      );
  }
  
}

class IntentManager {
  static activities = [];
  constructor() {
  }

  static setActivity(activity, Intent) {
    IntentManager.activities.push(activity);
    const usePrev = IntentManager.activities.at(
      IntentManager.activities.indexOf(this) - 1
    );

    activity.hasPrev = usePrev ? true : false;
    activity.prev = usePrev;
  }

  static getCurrentActivity() {
    return IntentManager.activities.at(-1);
  }

  static hasPrev() {
    return IntentManager.length > 1;
  }

  static getPrev() {
    return IntentManager.slice(-1, 1);
  }

  static prev() {
    IntentManager.splice[(1)];
    const newActivity = IntentManager[IntentManageractivities.length - 1];
    return new newActivity();
  }

  static next() {}
  static destroy(context) {
    context.frame.remove();
    IntentManager.activities.pop();
  }
}

const useState = function (initialValue) {
  let v = {
    value: initialValue,
  };

  function updateValue(value) {
    v.value = value;
  }
  return [v.value, updateValue];
};

class Intent {
  #frameColor = config?.colors?.appBgColor;
  //color.primary500
  constructor() {
    this.navigation = {
      links: [],
      elements: [],
      bar: null,
      visible: true,
      availableElementsContainer: null,
    };
    // this.internalUI = null
    this.running = false;
    IntentManager.setActivity(this);
  }

  createId() {
    const id = Math.floor(Math.random() * 9999);
    this.frame.setAttribute("id", id);
    this.id = id;
  }
  getId() {
    return this.id;
  }
  getFrameColor() {
    return this.#frameColor;
  }
  setFrameColor(value) {
    if (value?.trim().startsWith("bg-")) {
      this.#frameColor = value.replace("bg-", "");
    } else {
      this.#frameColor = value;
    }
  }

  getNavigationBar() {
    return this.navigation.bar;
  }
  setNavigationLinks(links) {
    if (!(links instanceof Array))
      throw new EException("Argument must be an array");
    this.navigation.links.push(...links);
    this.createNavigationBar();
  }
  getNavigationElements() {
    return this.navigation.elements.slice(1);
  }
  createNavigationBar() {
    const links = this.navigation?.links;
    if (!this.navigation.visible) {
      return this.navigation.bar?.remove();
    }
    // ********* pre-rendered
    const frame = this.frame;
    const nav = frame.nextNode(null, "div");

    const goBack = nav.nextNode(null, "button");
    goBack.type = "button";
    goBack.setCss(
      `fa fa-${this.hasPrev ? "arrow-left" : "home"} text-${
        color.white
      } font-bold p-2 bg-${color.primary700} rounded-full shadow-lg`
    );
    // ************
    let c;
    c = nav.nextNode(null, "div");
    nav.setCss("flex justify-between items-center");

    links?.map((link) => {
      let clickable = c.nextNode(`${link?.url}`, `button`);
      clickable.type = "button";
      clickable.setCss("text-white font-bold p-2 rounded-full");
      clickable.addEventListener(
        "click",
        link?.callback ||
          ((e) => {
            console.log("Clicked ", link.url);
          })
      );
      this.navigation.elements.push(clickable);
    });

    goBack.addEventListener(
      "click",
      function (e) {
        if (!this.hasPrev) {
          IntentManager.destroy(this);
        }
        IntentManager.destroy(this);
      }.bind(this)
    );

    this.navigation.elements.unshift(goBack);
    this.navigation.availableElementsContainer = c;
    this.navigation.bar = nav;
  }
  getAvailableElementsContainer() {
    return this.navigation.availableElementsContainer;
  }
  addEvent(event, handler) {
    this.frame.addEventListener(event, function (e) {
      handler(e);
    });
  }
  createActivity() {
    this.running = true;
    this.frame = createNode("div");
    // this.frame.id = 'children-container'
    this.frame.setCss(
      `fixed w-full h-full top-0 left-0 right-0 bottom-0 p-5 bg-${this.getFrameColor()} overflow-auto`
    );
    this.createId();
    this.setNavigationLinks([{ url: "APIs" }, { url: "Login" }]);
    this.next();
    return { Activity: this, frame: this.frame };
  }
  getContext(clb) {
    clb(this);
  }
  next() {
    //this.prev = prev
    if (this.running) {
      selectNode("body").appendChild(this.frame);
    } else {
      this.children;
      console.log("frame is not already running ");
    }
  }
  setData(data) {
    this.data = data;
  }
  createChildren(clb, data = null) {
    if (typeof clb !== "function")
      throw new EException("Argument must be a valid callback function");
    // TODO: Do something with children
    const children = clb({ frame: this.frame, context: this, data });
    this.children = children;
    this.createFooter(this.frame);
  }
  updateActivity() {
    if (typeof fragment !== "function")
      throw new EException("Argument must be a valid callback function");
return this;
  }
  createFooter(frame, content = null, node = null) {
    const footer = frame
      .nextNode(content || "Developed by Itzfeminisce", node || "p")
      .setCss("text-center text-sm p-3 text-white");
    this.footer = footer;
    // frame.appendChild(footer)
    // if(typeof clb === 'function') clb(this.children)
    // if(!rerun) return;
    //  this.next()
    return footer;
  }
  removeFooter(frame) {
    frame.removeChild(this.footer);
    //this.next()
  }
}

const createStyle = (clb) => {
  let dependencies;
  if ((dependencies = document.querySelector('.dependency'))) {
    dependencies.remove();
  }
  try {
  fetchTailwind().then(()=>fetchFontAwesome()).then(()=>fetchAnimateCss()).then(()=>fetchGoogleFonts()).then(()=>clb());
  } catch (e) {
    throw new EException(e)
  }
};
const createLauncher = () => {
  const btn = createNode('button');
  btn.type = 'button';
  btn.setCss(`bg-${color.primary700} absolute bottom-10 right-10 p-5 rounded-lg fa fa-inbox text-2xl shadow-2xl shadow-blue-500 text-${color.white}`);
  return btn
};

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsMAAAFhCAYAAACVsKc6AAAAAXNSR0IArs4c6QAAIABJREFUeF7svQecXUd59/+bmdNu3aKVtOqSey8YsAkBDAkQjENIePH7BxyMwYQQkzcQEhxqBIQWUoGEOIaYYggxSQxJSAiEHsAOdoxxky1bkq26RVtuPW1m/p9n7q4ky3vX0qr7PkeftaW9p8x8Z/bs7zznmd8jwBsTYAJMgAkwASbABJgAE+hRAqJH+83dZgJMgAkwASbABJgAE2ACYDHMk4AJMAEmwASYABNgAkygZwmwGO7ZoeeOMwEmwASYABNgAkyACbAY5jnABJgAE2ACTIAJMAEm0LMEWAz37NBzx5kAE2ACTIAJMAEmwARYDPMcYAJMgAkwASbABJgAE+hZAiyGe3boueNMgAkwASbABJgAE2ACLIZ5DjABJsAEmAATYAJMgAn0LAEWwz079NxxJsAEmAATYAJMgAkwARbDPAeYABNgAkyACTABJsAEepYAi+GeHXruOBNgAkyACTABJsAEmACLYZ4DTIAJMAEmwASYABNgAj1LgMVwzw49d5wJMAEmwASYABNgAkyAxTDPASbABJgAE2ACTIAJMIGeJcBiuGeHnjvOBJgAE2ACTIAJMAEmwGKY5wATYAJMgAkwASbABJhAzxJgMdyzQ88dZwJMgAkwASbABJgAE2AxzHOACTABJsAEmAATYAJMoGcJsBju2aHnjjMBJsAEmAATYAJMgAmwGOY5wASYABNgAkyACTABJtCzBFgM9+zQc8eZABNgAkyACTABJsAEWAzzHGACTIAJMAEmwASYABPoWQIshnt26LnjTIAJMAEmwASYABNgAiyGeQ4wASbABJgAE2ACTIAJ9CwBFsM9O/TccSbABJgAE2ACTIAJMAEWwzwHmAATYAJMgAkwASbABHqWAIvhnh167jgTYAJMgAkwASbABJgAi2GeA0yACTABJsAEmAATYAI9S4DFcM8OPXecCTABJsAEmAATYAJMgMUwzwEmwASYABNgAkyACTCBniXAYrhnh547zgSYABNgAkyACTABJsBimOcAE2ACTIAJMAEmwASYQM8SYDHcs0PPHWcCTIAJMAEmwASYABNgMcxzgAkwASbABJgAE2ACTKBnCbAY7tmh544zASbABJgAE2ACTIAJsBjmOcAEmAATYAJMgAkwASbQswRYDPfs0HPHmQATYAJMgAkwASbABFgM8xxgAkyACTABJsAEmAAT6FkCLIZ7dui540yACTABJsAEmAATYAIshnkOMAEmwASYABNgAkyACfQsARbDPTv03HEmwASYABNgAkyACTABFsM8B5gAE2ACTIAJMAEmwAR6lgCL4Z4deu44E2ACTIAJMAEmwASYAIthngNMgAkwASbABJgAE2ACPUuAxXDPDj13nAkwASbABJgAE2ACTIDFMM8BJsAEmAATYAJMgAkwgZ4lwGK4Z4eeO84EmAATYAJMgAkwASbAYpjnABNgAkyACTABJsAEmEDPEmAx3LNDzx1nAkyACTABJsAEmAATYDHMc4AJMAEmwASYABNgAkygZwmwGO7ZoeeOMwEmwASYABNgAkyACbAY5jnABJgAE2ACTIAJMAEm0LMEWAz37NBzx5kAE2ACTIAJMAEmwARYDPMcYAJMgAkwASbABJgAE+hZAiyGe3boueNMgAkwASbABJgAE2ACLIZ5DjABJsAEmAATYAJMgAn0LAEWwz079NxxJsAEmAATYAJMgAkwARbDPAeYABNgAkyACTABJsAEepYAi+GeHXruOBNgAkyACTABJsAEmACLYZ4DTIAJMAEmwASYABNgAj1LgMVwzw49d5wJMAEmwASYABNgAkyAxTDPASbABJgAE2ACTIAJMIGeJcBiuGeHnjvOBJgAE2ACTIAJMAEmwGKY5wATYAJMgAkwASbABJhAzxJgMdyzQ88dZwJMgAkwASbABJgAE2AxzHOACTABJsAEmAATYAJMoGcJsBju2aHnjjMBJsAEmAATYAJMgAmwGOY5wASYABNgAkyACTABJtCzBFgM9+zQc8eZABNgAkyACTABJsAEWAzzHGACTIAJMAEmwASYABPoWQIshnt26LnjTIAJMAEmwASYABNgAiyGeQ4wASbABJgAE2ACTIAJ9CwBFsM9O/TccSbABJgAE2ACTIAJMAEWwzwHmAATYAJMgAkwASbABHqWAIvhnh167jgTYAJMgAkwASbABJgAi2GeA0yACTABJsAEmAATYAI9S4DFcM8OPXecCTABJsAEmAATYAJMgMUwzwEmwASYABNgAkyACTCBniXAYrhnh547zgSYABNgAkyACTABJsBimOcAE2ACTIAJMAEmwASYQM8SYDHcs0PPHWcCTIAJMAEmwASY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";

const Index = function ({ frame, context }) {
  const showcase = frame.nextNode(null, "div");
  showcase.setCss("h-full w-full flex flex-col justify-around items-center");

  const container = showcase.nextNode(null, "div");
  container.setCss("flex flex-col justify-center items-center py-5");

  const bg = new Image(400, 400);
  bg.src = img;
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
    const { default: GetStarted } = await import('./GetStarted-04eaf89d.js');

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

class Zuma {
  constructor(options) {
    this.verifyOptions(options);
    createStyle();
  }

  verifyOptions(options) {
    if ([typeof options !== "object", !options].includes(true))
      throw Error("Invalid argument");
    if (!("launcher" in options)) {
      throw Error(
        `Constructor requires an object with {launcher: HTMLElement} at least.`
      );
    }
    this.launcher = options.launcher;
    this.launcher.addEventListener("click", function () {
        const { Activity } = new Intent().createActivity();
        try{
        Activity.createChildren(Index);
        }catch(e){
          console.log(e);
        }
    });
  }

  run() {
    this.launcher.appendChild(createLauncher());
  }
}

export { Intent as I, Zuma as Z, color as a, config as c, getById as g, img as i, useState as u };
