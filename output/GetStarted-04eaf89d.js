import { i as img, c as config, a as color, I as Intent, u as useState } from './main-c3a727b2.js';

const FeedBackSuccessPage = function({frame}){

  const showcase = frame.nextNode(null, 'div');
  showcase.setCss('h-full w-full flex flex-col justify-around items-center');
  
  const container = showcase.nextNode(null,'div');
  container.setCss('flex flex-col justify-center items-center py-5');
  
  const bg = new Image(400,400);
  bg.src = img;
  bg.setCss('m-3 object-fit');
  bg.onload=function (e){
    bg.src = e.target.currentSrc;
  };
  container.appendChild(bg);

  
   container.nextNode(`We have received your request tagged: (a4appleB4ballAndcForCup). \n\n\n We will get back to you asap!`, 'h1')
   .setFontFamily(config.fonts.secondary)
   .setCss(`text-white text-xl prose m-5`);

  return showcase;
};

const EnquiryForm = function({ frame }) {

  frame.nextNode('We normally return response in less than 1 hour.')
    .setCss(`text-white text-center mx-auto p-5 mt-10`);

  const {
    form,
    inputs: [username, password, description],
    submitButton,
    onSubmit: handleLoginFormSubmit
  } = frame.nextForm('/api/bot', 'get', [
    { label: '', name: 'fullname', placeholder: 'Your Fullname' },
    { label: '', name: 'email', placeholder: 'Your Email' },
    { label: '', name: 'description', placeholder: 'Describe your request here...', use: 'textarea', rows: 5, cols: 5 }
      ]);

  form.setCss('rounded-md m-auto block p-5');

  username.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg');
  password.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg');
   description.inputEl.setCss('p-5 pr-3 bg-slate-500/50 border-none rounded-lg outline-none mb-5 mx-auto w-full text-xl shadow-lg text-white');
  submitButton.setCss(`p-5 text-white bg-${color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg font-bold`);



  handleLoginFormSubmit((formData, e) => {
    e.preventDefault();


      const { Activity } = (new Intent).createActivity();
      Activity.createChildren(FeedBackSuccessPage);
  });

  return form;
};

const ChatUiWelcomePage = function({frame, context}){
     //context.setFrameColor('red-500')

  const showcase = frame.nextNode(null, 'div');
  showcase.setCss('h-full w-full flex flex-col justify-around items-center');
  
  const container = showcase.nextNode(null,'div');
  container.setCss('flex flex-col justify-center items-center py-5 text-white text-center space-y-5');
  
  container.nextNode(`Hi!`)
  .nextNode(`I'm ${config.appName}`,'h1')
  .setCss('my-3 text-4xl font-bold');

  const bg = new Image(200,200);
  bg.src = img;
  bg.setCss('m-3 object-fit rounded-full');
  bg.onload=function (e){
    bg.src = e.target.currentSrc;
  };
  container.appendChild(bg);

container.nextNode('How can i help you today?').setCss('my-5');

const op = container.nextNode(null,'select');
 op.add(new Option('I want to...', 'nothing',true));
 op.add(new Option('Talk to zuma', 'zuma',true));
 /*
 op.add(new Option('Make Enquiries', 'enquire',true))
 op.add(new Option('Read FAQs', 'faqs',true))
 op.add(new Option(`Know how to use ${config.appName}`, 'faqs',true))
 op.add(new Option('Say Hello', 'hello',true))
 op.add(new Option('Do something not listed here', 'chat',true))
 */
 
 op.setCss('form-select py-2 px-3 rounded-full font-bold text-white bg-blue-700 text-center shadow-lg w-full outline-none border-none max-w-full');
 
op.addEventListener('change', async function (e){
  const option = e.target;
  switch(option.value){
    case 'zuma':
      const {default: zuma} = await import('./Zuma-0337f398.js');
  const {Activity}=(new Intent).createActivity();
      Activity.createChildren(zuma);
      break;
  }
});
  return showcase;
};

let [count, setCount] = useState(3);

const LoginForm = function({ frame, context, data }) {

  frame.nextNode(data?.message || 'Log into your account (Trial Left: 3)')
    .setCss(`text-${data?'red-500':'white'} text-center mx-auto p-5 mt-10`);

  const {
    form,
    inputs: [username, password, description],
    submitButton,
    onSubmit: handleLoginFormSubmit
  } = frame.nextForm('/api/bot', 'get', [
    { label: '', name: 'username', placeholder: 'Type "demo"' },
    { label: '', name: 'password', placeholder: 'Type "12345"' },
      ]);

  form.setCss('rounded-md m-auto block p-5');

  username.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg');
  password.inputEl.setCss('p-5 text-white bg-slate-500/50 border-none rounded-sm outline-none mb-5 mx-auto w-full text-xl shadow-lg');
  submitButton.setCss(`p-5 text-white bg-${color.primary700} border-none rounded-lg outline-none mt-10 mx-auto w-full shadow-lg`);



  handleLoginFormSubmit((formData, e) => {
    e.preventDefault();

    try {

      // Dummy data
      const username = formData.get('username'),
        password = formData.get('password');

      const authenticated = (username === 'demo' && password === '12345') ? true : false;

      let nextPage, response;

      if (authenticated) {
        nextPage = GetStarted;
        response ={message: 'Login Successful',auth:true};

      } else {

        if (count <= 0) {
          alert("You have exceeded the trial count. browser will now be reloaded.");
          window.location.reload();
        }

        nextPage = LoginForm;
        response = {
          ok: authenticated,
          trial: count,
          message: `Please supply the correct information (Trial Left: ${count})`
        };
        setCount(--count);

      }

      const { Activity } = (new Intent).createActivity();
      Activity.createChildren(nextPage, response);
    } catch (e) {
      console.log(e);
    }
  });

  return form;
};

const GetStarted = function({frame, context, data}){
 

  const showcase = frame.nextNode(null, 'div');
  showcase.setCss('w-full h-full flex flex-col justify-center items-center');
  showcase.nextNode(data?.message||"Getting Started Page",'h1')
  .setCss('uppercase text-center text-white text-4xl font-sansSerif');
  
  //showcase.appendChild(p)
showcase.nextNode('Our correspondence are not available at the moment. Please leave us a feedback.', 'h3')
.setCss('text-center m-10 text-white prose');

showcase.nextNode(`Meanwhile, you may find useful answers from ${config.appName}`,'p')
.setCss('text-white text-center');


  const zuma = showcase.nextNode(`Chat with ${config.appName}`, 'button');
  zuma.setCss(`my-5 flex justify-center items-center text-white text-lg font-bold font-impact bg-${color.primary500} rounded-full px-3 shadow-lg`);
  
  const fb = showcase.nextNode('Send us a feedback', 'button')
  .setCss(`mt-5 flex justify-center items-center text-white text-lg font-bold font-impact bg-${color.primary300} rounded-full px-3 shadow-lg`);
  
 
  
  
  fb.addEventListener('click', async function(){
    
const { Activity } = (new Intent).createActivity();
      Activity.createChildren(EnquiryForm);
  });
  
 zuma.addEventListener('click',  function(){
    const auth = data?.auth||false;
    let response, nextPage;
    if(!auth){
      nextPage = LoginForm;
      response={
        message:'Please Login first!',
        ok: false,
        trial:3
      };
    }else {
      nextPage = ChatUiWelcomePage;
      response=`Welcome back!`;
    }
   console.log(nextPage); 
const { Activity } = (new Intent).createActivity();

    Activity.createChildren(nextPage, response);
  });
  
  
  return showcase;
};

export { GetStarted as default };
