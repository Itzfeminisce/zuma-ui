"use strict";
import { color } from "../lib/utils.js";
import Intent from "../lib/Intent.js";
import FeedBackSuccessPage from "./FeedBackSuccessPage.js";

const EnquiryForm = function ({ frame, context }) {
  frame
    .nextNode("We normally return response in less than 1 hour.")
    .setCss(`text-${color.black} text-center mx-auto p-5 mt-10`);

  const {
    form,
    inputs: [username, password, description],
    submitButton,
    onSubmit: handleLoginFormSubmit,
  } = frame.nextForm("/api/bot", "get", [
    { label: "", name: "fullname", placeholder: "Your Fullname" },
    { label: "", name: "email", placeholder: "Your Email" },
    {
      label: "",
      name: "description",
      placeholder: "Describe your request here...",
      use: "textarea",
      rows: 5,
      cols: 5,
    },
  ]);

  form.setCss("rounded-md m-auto block p-5");

  username.inputEl.setCss(
    "p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg"
  );
  password.inputEl.setCss(
    "p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg"
  );
  description.inputEl.setCss(
    "p-5 pr-3 bg-slate-500/50 border-none rounded-lg outline-none mb-5 mx-auto w-full text-xl shadow-lg text-white"
  );
  submitButton.setCss(
    `p-5 text-white bg-${color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg font-bold`
  );

  handleLoginFormSubmit((formData, e) => {
    e.preventDefault();

    const { Activity } = new Intent().createActivity();
    Activity.createChildren(FeedBackSuccessPage);
    setTimeout(() => Activity.manager.destroy(Activity.prev), 1000);
  });

  return form;
};

export default EnquiryForm;
