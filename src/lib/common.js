'use strict'
import config from '../config.js'



export const getById = (id) => document.getElementById(id)

export const selectNode = (name) =>{ 
  return document.querySelector(name)
}
export const createNode = (name,option) => {
 const el = document.createElement(name)
 if(option instanceof Function){
    return option(el)
  }
  if(option instanceof Object){
    if(options.children){
      el.children = option.children
    }
  }
  if(typeof option === 'string'){
    el.innerHTML = option
  }
  return el
}
export const getByDataSet = (name) => document.querySelector(`[data-${config.prefix}-${name}]`)

