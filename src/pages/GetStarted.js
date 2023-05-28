'use strict'

import Intent from '../lib/Intent.js'
import {getById} from '../lib/common.js'
import EnquiryForm from './EnquiryForm.js'
import ChatUiWelcomePage from './ChatUiWelcomePage.js'
import LoginForm from './LoginForm.js'
import {useState, useSetInterval} from '../lib/hooks.js'


import { color } from '../lib/utils.js'
import config from '../config.js'


const GetStarted = function({frame, context, data}){
 

  const showcase = frame.nextNode(null, 'div')
  showcase.setCss('w-full h-full flex flex-col justify-center items-center')
  showcase.nextNode(data?.message||"Getting Started Page",'h1')
  .setCss('uppercase text-center text-white text-4xl font-sansSerif')
  
  //showcase.appendChild(p)
showcase.nextNode('Our correspondence are not available at the moment. Please leave us a feedback.', 'h3')
.setCss('text-center m-10 text-white prose')

showcase.nextNode(`Meanwhile, you may find useful answers from ${config.appName}`,'p')
.setCss('text-white text-center')


  const zuma = showcase.nextNode(`Chat with ${config.appName}`, 'button')
  zuma.setCss(`my-5 flex justify-center items-center text-white text-lg font-bold font-impact bg-${color.primary500} rounded-full px-3 shadow-lg`)
  
  const fb = showcase.nextNode('Send us a feedback', 'button')
  .setCss(`mt-5 flex justify-center items-center text-white text-lg font-bold font-impact bg-${color.primary300} rounded-full px-3 shadow-lg`)
  
 
  
  
  fb.addEventListener('click', async function(){
    
const { Activity } = (new Intent).createActivity()
      Activity.createChildren(EnquiryForm)
  })
  
 zuma.addEventListener('click',  function(){
    const auth = data?.auth||false;
    let response, nextPage;
    if(!auth){
      nextPage = LoginForm
      response={
        message:'Please Login first!',
        ok: false,
        trial:3
      }
    }else{
      nextPage = ChatUiWelcomePage
      response=`Welcome back!`;
    }
   console.log(nextPage) 
const { Activity } = (new Intent).createActivity()

    Activity.createChildren(nextPage, response)
  })
  
  
  return showcase;
}
  

export default GetStarted