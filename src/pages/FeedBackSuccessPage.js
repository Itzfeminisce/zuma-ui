'use strict'



import config from '../config.js'
import { color } from '../lib/utils.js'
import BgImage from '../files/bg.png'

const FeedBackSuccessPage = function({frame}){
  const showcase = frame.nextNode(null, 'div')
  showcase.setCss('h-full w-full flex flex-col justify-around items-center')
  
  const container = showcase.nextNode(null,'div')
  container.setCss('flex flex-col justify-center items-center py-5')
  
  const bg = new Image(400,400)
  bg.src = BgImage;
  bg.setCss('m-3 object-fit')
  bg.onload=function (e){
    bg.src = e.target.currentSrc;
  }
  container.appendChild(bg)

  
   container.nextNode(`We have received your request tagged: (a4appleB4ballAndcForCup). \n\n\n We will get back to you asap!`, 'h1')
   .setFontFamily(config.fonts.secondary)
   .setCss(`text-${config.colors.appTextColor} text-xl prose m-5`)

  return showcase;
}

export default FeedBackSuccessPage