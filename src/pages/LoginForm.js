"use strict";
import { color } from "../lib/utils.js";
import Intent from "../lib/Intent.js";
import { useState } from "../lib/hooks.js";
import GetStarted from "./GetStarted.js";

let [count, setCount] = useState(3);

const LoginForm = function ({ frame, context, data }) {
  frame
    .nextNode(
      data?.trial <= 0
        ? "You seem to have entered the wrong details multiple times. You can request a password reset by clicking the link below"
        : data?.message || "Log into your account (Trial Left: 3)"
    )
    .setCss(
      `text-${data?.trial ? "red-500" : "white"} ${
        data?.trial <= 0 ? "bg-blue-300 text-blue-700" : "bg-transparent"
      } text-center mx-auto p-5 mt-10`
    );

  const {
    form,
    inputs: [username, password, description],
    submitButton,
    onSubmit: handleLoginFormSubmit,
  } = frame.nextForm("/api/bot", "get", [
    {
      label: "",
      name: "username",
      placeholder: 'Type "demo"',
      value: data?.credentials?.username,
    },
    { label: "", name: "password", placeholder: 'Type "12345"' },
  ]);

  form.setCss("rounded-md m-auto block p-5");

  username.inputEl.setCss(
    "p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg"
  );
  password.inputEl.setCss(
    "p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg"
  );

  submitButton.setCss(
    `p-5 text-white bg-${color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg mb-5`
  );

  if (data?.html) {
    const { text, tag, handleClick } = data?.html;
    form
      .nextNode(text, tag, { onclick: handleClick })
      .setCss("text-white underline");
  }

  handleLoginFormSubmit((formData, e) => {
    e.preventDefault();
    try {
      // Dummy data
      const username = formData.get("username"),
        password = formData.get("password");

      const authenticated =
        username === "demo" && password === "12345" ? true : false;

      let nextPage, response, html;

      if (authenticated) {
        nextPage = GetStarted;
        response = { message: "Login Successful", authenticated };
      } else {
        if (count <= 0) {
          //
          html = {
            text: "Forgot Password?",
            tag: "a",
            handleClick: async () => {
             await handlePasswordReset(response);
            },
          };
        }

        nextPage = LoginForm;
        response = {
          authenticated,
          trial: count,
          message: `Please supply the correct information (Trial Left: ${count})`,
          html,
          credentials: {
            username,
          },
        };
        setCount(count <= 0 ? 0 : --count);
      }

      const { Activity } = new Intent().createActivity();
      Activity.createChildren(nextPage, response);
      Activity.manager.destroy(Activity.prev,1000);
    } catch (e) {
      console.log(e);
    }
  });

  return form;
};

async function handlePasswordReset(response) {
  const { default: PasswordReset } = await import("./PasswordReset.js");
    const { Activity } = new Intent().createActivity();
  Activity.createChildren(PasswordReset, response);
  Activity.manager.destroy(Activity.prev,1000);
}

export default LoginForm;
