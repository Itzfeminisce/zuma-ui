'use strict'

import Intent from '../lib/Intent.js'


// Pages

import { color } from '../lib/utils.js'


function Api({frame}) {
  const showcase = frame.nextNode(null, 'div')
  showcase.setCss('w-full h-full flex flex-col justify-center items-center')
  
  const p = showcase.nextNode('APIs Page','h1')
  p.setCss('uppercase text-center text-white text-4xl font-sansSerif')
  

 // const getStarted = showcase.nextNode('APIs', 'button')
  
  return showcase
}

export default Api