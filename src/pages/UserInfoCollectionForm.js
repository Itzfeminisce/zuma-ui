"use strict";
import { color } from "../lib/utils.js";
import Intent from "../lib/Intent.js";

const EnquiryForm = function ({ frame, context }) {
  frame
    .nextNode("Please fill this form before proceeding.")
    .setCss(`m-3 p-px text-center text-yellow-600 rounded-full`);

  const {
    form,
    inputs: [username, password, description],
    submitButton,
    onSubmit: handleLoginFormSubmit,
  } = frame.nextForm("/api/bot", "get", [
    {
      errorField: "I will address you by this name",
      name: "fullname",
      placeholder: "Fullname",
    },
    { name: "email", placeholder: "Email" },
    {
      name: "description",
      placeholder: "Describe your request",
      use: "textarea",
      rows: 5,
      cols: 5,
    },
  ]);

  form.setCss("rounded-md m-auto block p-5");

  username.inputEl.setCss(
    "p-5 text-black !bg-slate-300/20 border-none rounded-full outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm"
  );
  username.errorField.setCss("mb-5 py-px text-orange-400 text-xs text-center");

  password.inputEl.setCss(
    "p-5 text-black !bg-slate-300/20 border-none rounded-full outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm mb-4"
  );
  // password.errorField.setCss("mb-5 py-px text-orange-600/30 text-xs")

  description.inputEl.setCss(
    "p-5 text-black !bg-slate-300/20 border-none rounded-lg outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm"
  );
  //username.errorField.setCss("mb-5 py-px text-orange-600/30 text-xs")

  submitButton.setCss(
    `p-3 text-slate-500 uppercase !bg-black/10 border-none rounded-full outline-none mt-10 mx-auto w-full shadow-lg font-bold`
  );
  handleLoginFormSubmit(async (formData, e) => {
    e.preventDefault();
if(!(formData.get("fullname").trim())) return (username.errorField.innerHTML = "<b>This field is important</b>")
    const { Activity } = new Intent().createActivity();
    const { default: Index } = await import("./Index.js");
    Activity.createChildren(Index, formData);
    //setTimeout(() =>
    Activity.manager.destroy(Activity.prev);
    //, 1000);
  });
 // context.removeFooter();
  return form;
};

export default EnquiryForm;
