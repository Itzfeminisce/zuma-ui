"use strict";
import { color } from "../lib/utils.js";
import Intent from "../lib/Intent.js";

const Feedback = function ({ frame, context, data }) {

    const h1 = frame
        .nextNode(`Rate your stay in each of these categories.`)
        .setCss(`m-5 text-center text-black rounded-full text-narrow text-3xl uppercase`);
        h1.nextNode(`This is private between you and ${context.config.appName}`,"p").setCss('py-4 text-slate-500 text-sm lowercase first-letter:uppercase')

    const {
        form,
        inputs: [description],
        submitButton,
        onSubmit: handleLoginFormSubmit,
    } = frame.nextForm("/api/bot", "get", [

        {
           name: "description",
            placeholder: "Describe your Experiences or Recommendations",
            use: "textarea",
            rows: 5,
            cols: 5,
        },
    ]);

    form.setCss("rounded-md m-auto block p-5");
    
    description.inputEl.setCss(
        "p-5 text-black !bg-slate-300/20 border-none rounded-sm outline-none mx-auto w-full text-lg placeholder:text-slate-400 placeholder:font-bold placeholder:pl-2 placeholder:uppercase placeholder:text-sm"
    );

    submitButton.setCss(
        `p-3 text-slate-500 uppercase !bg-black/10 border-none rounded-full outline-none mt-10 mx-auto w-full shadow-lg font-bold`
    );
    handleLoginFormSubmit(async (formData) => {
        if (!formData.get("description").trim())
            return (description.errorField.innerHTML =
                "<b class='text-red-500'>This field is important</b>");
        else description.errorField.innerHTML = "";

        

        // const { destroy, getPrev } = Intent.getManager();
//         destroy(getPrev());
    });
    
       // context.removeFooter();
     // context.dropDownMenuItems([{text:"Foo bar",callback(){alert()}}]);

    return form;
};

export default Feedback;
