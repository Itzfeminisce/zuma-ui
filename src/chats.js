  const BOT = [
    {
      id: 0,
      title:
        "I'm Glad to have assisted you this far. Please kindly rate my response. 1 means very unhelpful while 5 means extremely helpful.",
      suggests: {
        // 0: "Read Docs",
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
    {
      id: -1,
      title: "Whats the plan today?",
      suggests: {
        // 0: "Read Docs",
        1: "Read Docs",
        2: "Get CDN",
        3: "Generate Starter app",
        4: "See more",
        5: "Just chilling 😇",
      },
    },
    {
      id: 4,
      title:
        "We also provide a conversation generator that helps you generate how our bot respond to visitors questions just the way i talk to yoi now.",
      suggests: {
        14: "Learn more",
       1 : "Read our documentation",
      },
    },
    {
      id: 5,
      title:
        "Thank you for using our app. Please let me know if you need my help.",
      suggests: {
        0: "You're welcome.",
       1 : "Read our documentation",
      },
    },
    {
      id: 3,
      title:
        "You can clone/fork this project source from our github repo",
      suggests: {
        13: "GOTO:github.com/Itzfeminisce/embeddable -chatbot.git",
       1 : "Read our documentation",
      },
    },
    {
      id: 2,
      title:
        "Here's the our CDN. kindly copy/paste in your page.",
      suggests: {
        12: "COPY:https://unpkg.com/zuma-ui@latest",
        13: "That's all",
      },
    },
    {
      id: 1,
      title:
        "Great choice! A better way of understanding any project is by taking a glance at the documentations. However, the choice is yours.",
      suggests: {
        6: "Get Started",
        7: "APIs",
        8: "Configuration File",
        9: "What is Intent?",
        0: "Quit",
      },
    },
    {
      id: 6,
      title:
        "Our app is designed with full customisation in mind. You should started by appending our CDN into your page and see the magic",
      suggests: { 2: "Get CDN", 11: "Generate Starter Kit", 1: "Return" },
    },
  ];
export default BOT