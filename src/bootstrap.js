'use strict'
import { createNode } from './lib/common.js'
import { fetchTailwind, fetchFontAwesome, fetchAnimateCss, fetchGoogleFonts, color} from './lib/utils.js'
import EException from './exception/EmbeddableException.js'

export const createStyle = (clb) => {
  let dependencies
  if ((dependencies = document.querySelector('.dependency'))) {
    dependencies.remove()
  }
  try {
  fetchTailwind().then(()=>fetchFontAwesome()).then(()=>fetchAnimateCss()).then(()=>fetchGoogleFonts()).then(()=>clb())
  } catch (e) {
    throw new EException(e)
  }
}
export const createLauncher = () => {
  const btn = createNode('button')
  btn.type = 'button'
  btn.setCss(`bg-${color.primary700} absolute bottom-10 right-10 p-5 rounded-lg fa fa-inbox text-2xl shadow-2xl shadow-blue-500 text-${color.white}`)
  return btn
}

