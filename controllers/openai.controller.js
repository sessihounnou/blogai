const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
const openai = new OpenAIApi(configuration);

exports.generateText = async (prompt)=>{
   const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 4000,
        temperature: 0,
      });
    console.log(res.data.choices[0].text);
}
