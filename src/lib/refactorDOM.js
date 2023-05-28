'use strict'
import {createNode} from './common.js'
import config from '../config.js'


String.prototype.ucfirst=function (){
  return this.charAt(0).toUpperCase()+this.slice(1,this.length)
}

HTMLElement.prototype.setFontFamily = function(font){
  this.style.fontFamily = font
  return this
}
HTMLElement.prototype.setCss = function(style) {
  let classList = this.classList;
  style.split(' ').forEach((_cssClass, i) => {
    classList.add(_cssClass.trim())
  })
  this.classList = classList
  this.classList.add('animate__animated',`${config.animation}`)
  
  this.addEventListener('animationend',function(){
    this.classList.remove(`${config.animation}`)
  })
  return this;
}

let i = 0
HTMLElement.prototype.nextNode= function(textContent = '', nodeName = 'div', attributes = {}){
  const node = createNode(nodeName)
  for(let attribute in attributes){
    const attr = attributes[attribute]
    if(attribute == 'className'){
      attribute = 'class'
    }
    node[attribute] = attr
  }
  if(!['img','input'].includes(nodeName)){
  node.innerHTML = textContent;
  }
  this.appendChild(node)
  return node;
}


HTMLElement.prototype.nextForm = function (action, method, children=[
  {label:"Username", name:'name1',placeholder:"Type here...",id:"input1"}
  ]){
    
    let label, input, inputEl, inputs = [], submitButton
  const form = createNode('form')
  const submit = createNode('button')
  
  submit.type = 'submit';
  form.action = action
  form.method = method
  
  children?.forEach((input,i)=>{
  //  for(const attr of input){
          label = createNode('label')

      if(!input?.label){
        label.setAttribute('for',input.name)
      }else{
        label.for = input?.id ?? input.name
      }
        label.textContent = input?.label?.ucfirst()
   //   }     
       if(input?.use){
          inputEl = createNode(input.use)
switch (input.use) {
  case 'textarea':
    inputEl.rows = input?.rows
    inputEl.cols = input?.cols
    break;
}
  }else{
      inputEl = createNode('input')
  }

      inputEl.name = input.name
      inputEl.placeholder = input.placeholder
      inputEl.id = input?.id ?? input.name
      inputEl.setAttribute('type',(input?.type ?? (['password','pwd','pass','passwd'].includes(input?.name?.toLowerCase()))?'password':(['phone','number','digit'].includes(input?.name?.toLowerCase()))?'number':'text'))
    
        
   
      
    label.appendChild(inputEl)
    form.appendChild(label)
      
    inputs.push({label,inputEl})

  })
  submitButton = form.nextNode('Submit','button',{type:'submit'})
  this.appendChild(form)
  return{
    inputs,form,submitButton,
      onSubmit(clb){
        if(typeof clb === 'function'){
          form.addEventListener('submit', function(e){
          clb((new FormData(this)),e)
          })
        }
      }
  }
}

export default HTMLElement