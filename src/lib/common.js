"use strict";
const urlExtractor=require('extract-urls')
//import config from "../config.js";

//const config = JSON.parse(window.localStorage.getItem("clientConfig"))
export const isValidUrl = urlString=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
	}
	
export const redirectTo=(url)=>{
  if(isValidUrl(url)) {
    if(window.confirm("You will be redirected to an external address. Ensure you trust this address before proceeding. Continue?")){
      window.location.href = url
    }
  } 
}
export const copyToClipboard=(str)=>{
  var copyTextarea = document.createElement('input');
document.body.appendChild(copyTextarea)
  copyTextarea.value = str
  copyTextarea.focus();
  copyTextarea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg, copyTextarea.value);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
document.body.removeChild(copyTextarea)
  return str
}
export const urlExtract=(str)=>{
  return urlExtractor(str)?.at(0)
}
export const getById = (id) => document.getElementById(id);

export const selectNode = (name) => {
  return document.querySelector(name);
};


export const createNode = (name, option) => {
  const el = document.createElement(name);
  if (option instanceof Function) {
    return option(el);
  }
  if (option instanceof Object) {
    if (option.children) {
      el.children = option.children;
    }
    if(hasProp(option,"attributes") && isObject(option.attributes)){
      for(let key in option.attributes){
      //  console.log(key)
        el.setAttribute(key, option.attributes[key])
      }
    }
    if(hasProp(option,"attributes") && isArray(option.attributes)){
      option.attributes.forEach(attr=>{
      if(!(hasProp(attr,"key")
      && hasProp(attr,"value"))) throw new Error("option.attributes must be an array of Object with {key:String, value:String} format")
        el.setAttribute(attr.key, attr.value)
      })
    }
    
  }
  if (typeof option === "string") {
    el.innerHTML = option;
  }
  return el;
};

export const isObject = (d) => d?.constructor?.name === "Object";


export const hasProp = (d, i) => isObject(d) && Object.keys(d).includes(i);


export const isString = (d) => d?.constructor?.name === "String";


export const isArray = (d) => d?.constructor?.name === "Array";


export const isFunc = (d) => d?.constructor?.name === "Function";


export const isHtmlElement = (d) => d?.constructor?.name.startsWith("HTML");


export const getType = (d) => d?.constructor?.name;


export const dotToCamel = (d) => {
  if (d.includes(".")) {
    const t = [...d];
    const v = t.indexOf(".");
    t.splice(v, 1, t.at(v + 1).toUpperCase());
    t.splice(v + 1, 1);
    return t.join("");
  }
  return d;
};


export const toMap = (obj, seperator = ".", gum = "=") => {
  let result = [];
  const map = new Map();
  const traverse = (o, path = "") => {
    for (let key in o) {
      let value = o[key];
      if (isObject(value) && Object.keys(value).length > 0) {
        traverse(value, path + key + seperator);
      } else {
        result.push(`${path + key}${gum}${value}`);
        map.set(`${path}${key}`, value);
      }
    }
  };
  traverse(obj);
  return map;
};

export const fromMap = (arr)=>{
 // const arr = [["0.name",1],["0.name.1",2],["1.foo","bar"]];
const result = arr.reduce((acc, [key, value]) => {
  const keys = key.split('.');
  const objIndex = parseInt(keys.shift());
  const propName = keys.pop();
  const obj = acc[objIndex] || {};
  obj[propName || obj.length] = value;
  acc[objIndex] = obj;
  return acc;
}, []);
return result
}
export const getProps = (d) => {
  if (d?.constructor?.name === "Object") {
    return Object.keys(d);
  }
  throw new Error(getProps.name, "Object argument required");
};


export const writeStatus =(_loader)=>{
 let c={count:3,loader:false,time:undefined}
 function typing(loader){
   if(!loader || !isHtmlElement(loader)) throw new Error("Argument passed to 'typing' must be a valid HTMLElement")
  loader.setCss("!text-green-500 px-2 py-px rounded-lg")
  
   c.loader = loader
   c.time = setInterval(()=>{
   if(c.count <= 0)
   {
     c.loader.innerHTML = ""
     c.count = 3
   }
   c.count-- 
   c.loader.innerHTML = c.loader.innerHTML + "."
 },500)
 }
 return {
   isTyping:()=>typing(_loader),
   doneTyping(){
     clearInterval(c.time)
   }
 }
}