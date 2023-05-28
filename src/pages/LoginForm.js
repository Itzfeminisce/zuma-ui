'use strict'
import { color } from '../lib/utils.js'
import Intent from '../lib/Intent.js'
import { useState } from '../lib/hooks.js'
import GetStarted from './GetStarted.js'


let [count, setCount] = useState(3)

const LoginForm = function({ frame, context, data }) {

  frame.nextNode(data?.message || 'Log into your account (Trial Left: 3)')
    .setCss(`text-${data?'red-500':'white'} text-center mx-auto p-5 mt-10`)

  const {
    form,
    inputs: [username, password, description],
    submitButton,
    onSubmit: handleLoginFormSubmit
  } = frame.nextForm('/api/bot', 'get', [
    { label: '', name: 'username', placeholder: 'Type "demo"' },
    { label: '', name: 'password', placeholder: 'Type "12345"' },
      ])

  form.setCss('rounded-md m-auto block p-5')

  username.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg')
  password.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg')
  submitButton.setCss(`p-5 text-white bg-${color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg`)



  handleLoginFormSubmit((formData, e) => {
    e.preventDefault()

    try {

      // Dummy data
      const username = formData.get('username'),
        password = formData.get('password')

      const authenticated = (username === 'demo' && password === '12345') ? true : false

      let nextPage, response;

      if (authenticated) {
        nextPage = GetStarted
        response ={message: 'Login Successful',auth:true}

      } else {

        if (count <= 0) {
          alert("You have exceeded the trial count. browser will now be reloaded.")
          window.location.reload()
        }

        nextPage = LoginForm
        response = {
          ok: authenticated,
          trial: count,
          message: `Please supply the correct information (Trial Left: ${count})`
        }
        setCount(--count)

      }

      const { Activity } = (new Intent).createActivity()
      Activity.createChildren(nextPage, response)
    } catch (e) {
      console.log(e)
    }
  })

  return form;
}

export default LoginForm