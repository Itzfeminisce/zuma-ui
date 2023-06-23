"use strict";
import { color } from "../lib/utils.js";
import Intent from "../lib/Intent.js";

const PasswordReset = function ({ frame, context, data }) {
  frame
    .nextNode(
       data?.message || "Enter registered email!"
    )
    .setCss(
      `text-white text-center mx-auto p-5 mt-10`
    );

  const {
    form,
    inputs: [username],
    submitButton,
    onSubmit: handleLoginFormSubmit,
  } = frame.nextForm("/api/bot", "get", [
    { label: "", name: "username", placeholder: 'Type "demo@gmail.com"'},
  ]);

  form.setCss("rounded-md m-auto block p-5");

  username.inputEl.setCss(
    "p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg"
  );
  
  submitButton.setCss(
    `p-5 text-white bg-${color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg mb-5`
  );


  handleLoginFormSubmit((formData, e) => {
    e.preventDefault();
    try {
      // Dummy data
      const username = formData.get("username");

      const authenticated = username === "demo@gmail.com" 

      let nextPage = PasswordReset, response;

      if (authenticated) {
        response = {authenticated, message: `Password link has been sent to ${username}` };
      } else {
        response = {
          authenticated,
          message: `Please supply your correct email`,
        };
        //setCount(count <= 0 ? 0 : --count);
      }

      const { Activity } = new Intent().createActivity();
      Activity.createChildren(nextPage, response);
      Activity.manager.destroy(Activity.prev,1000)
    } catch (e) {
      console.log(e);
    }
  });

  return form;
};




export default PasswordReset;
