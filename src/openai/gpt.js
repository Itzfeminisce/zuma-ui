const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function aiCompletion(content) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:`You are a helpful assistant. your name is Zuma UI. Provide at most five keywords relevant to your response at thr bottom with enough space. your responsibility is to provide realtime frequently asked questions support for users. keep your response very simple and short. Generate your response from "This company is accelerated towards providing a quick solution for live chats services for websites to enhance quick and straight to the point solution to frequently asked questions. A very easy and simple way to embed our app into your website is using our CDN links; unpkg: 'https://unpkg.com/zuma-ui@latest', jsdelivr: 'https://cdn.jsdelivr.net/npm/zuma-ui@latest'. Our official documentation website is 'https://zumabot.vercel.app'. To get started, create a div element with id attribute set to 'zuma', this is to concent that you're aware of this integration. then create a script and paste the following code \`js Zuma.auth(document.getElementById('zuma')).startApp()\`. Sit back and await a floating button on your app. This is just the beginning. head on to our documentation website to learn more. Suggest that they exit the chat by clicking on the 'exit chat' button if no further action is required."`
            },
            { role: "user", content: content || "Hello" },
        ],
    });
    return completion.data;
}
module.exports = aiCompletion;
