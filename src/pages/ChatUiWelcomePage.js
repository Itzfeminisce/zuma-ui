'use strict'

import Intent from '../lib/Intent.js'

import UiImage from '../files/bg.png'
// Pages
//import GetStarted from './GetStarted.js'

import config from '../config.js'
import { color } from '../lib/utils.js'

const ChatUiWelcomePage = function({frame, context}){
     //context.setFrameColor('red-500')

  const showcase = frame.nextNode(null, 'div')
  showcase.setCss('h-full w-full flex flex-col justify-around items-center')
  
  const container = showcase.nextNode(null,'div')
  container.setCss('flex flex-col justify-center items-center py-5 text-white text-center space-y-5')
  
  container.nextNode(`Hi!`)
  .nextNode(`I'm ${context.config.appName}`,'h1')
  .setCss('my-3 text-4xl font-bold')

  const bg = new Image(200,200)
  bg.src = UiImage;
  bg.setCss('m-3 object-fit rounded-full')
  bg.onload=function (e){
    bg.src = e.target.currentSrc;
  }
  container.appendChild(bg)

container.nextNode('How can i help you today?').setCss('my-5')

const op = container.nextNode(null,'select')
 op.add(new Option('I want to...', 'nothing',true))
 op.add(new Option(`Talk to ${context.config.appName}`, 'zuma',true))
 /*
 op.add(new Option('Make Enquiries', 'enquire',true))
 op.add(new Option('Read FAQs', 'faqs',true))
 op.add(new Option(`Know how to use ${config.appName}`, 'faqs',true))
 op.add(new Option('Say Hello', 'hello',true))
 op.add(new Option('Do something not listed here', 'chat',true))
 */
 
 op.setCss('form-select py-2 px-3 rounded-full font-bold text-white bg-blue-700 text-center shadow-lg w-full outline-none border-none max-w-full')
 
op.addEventListener('change', async function (e){
  const option = e.target;
  switch(option.value){
    case 'zuma':
      const {default: zuma} = await import('./Zuma.js')
  const {Activity}=(new Intent).createActivity()
      Activity.createChildren(zuma)
      break;
  }
})
  return showcase;
}

export default ChatUiWelcomePage