const { createArticle } = require("./article.controller");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration);
exports.generateText = async (prompt)=>{
  const res = await openai.createCompletion({
       model: "text-davinci-003",
       prompt: prompt,
       max_tokens: 4000,
       temperature: 0,
     });
   console.log(res.data.choices[0]);
   return res.data.choices[0].text
}
generateText = async (prompt)=>{
   const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 4000,
        temperature: 0,
      });
    console.log(res.data.choices[0]);
    return res.data.choices[0].text
}
exports.autoarticle = async (req ,res ) => {
  generateText(req.prompt).then((content)=>{
      console.log("text has been generate");
      console.log(content);
    createArticle(req.prompt, content ).then((content)=>{
      console.log("article has been create ");
      res.status(201).json(content);
    }).catch((error)=>{
      res.status(501).json(error);
    })
  })
}