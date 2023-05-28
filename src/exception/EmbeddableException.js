'use strict'
export class EException extends Error {
  constructor(message){
    super(message)
    
    this.name = "EmbeddableException: "
    
    console.log(
      '................................',
      `\nException: ${this.name} \nMessage: ${this.message} \nStack: ${this.stack}\n`,
      '.................................'
      )
  }
  
}
export default EException