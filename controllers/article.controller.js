const { PrismaClient } = require('@prisma/client');
const CLIENT_URL = process.env.CLIENT_URL
const SERVER_URL = process.env.SERVER_URL
const axios = require('axios');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
const openai = new OpenAIApi(configuration);
const response = async ()=>{
    await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
}
console.log(response);
// const API_KEY = process.env.API_KEY;


// exports.createArticle = async(data) =>{
//     const createArticle = await prisma.article.create({
//         data : {
//             title : "",
//             content: ""
//         },
//     }).then(
//         async(createArticle)=>{
//             themeid=1;
//             if(themeid){
//                 const themearticle = prisma.themeArticle.create({
//                     data : {
//                         themeId : parseInt(themeid),
//                         articleId : parseInt(createArticle.id)
//                     }
//                 })
//             }
//         }
//     )
// } 


// async function generateText() {
 
// }


