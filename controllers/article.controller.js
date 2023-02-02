const { PrismaClient } = require('@prisma/client');
const CLIENT_URL = process.env.CLIENT_URL
const SERVER_URL = process.env.SERVER_URL
const axios = require('axios');
const  prisma = new PrismaClient()
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


exports.createArticle = async(title_ai,content_ai,image_name) =>{
    const createArticle = await prisma.article.create({
        data : {
            title : title_ai,
            content: content_ai,
            image : image_name,
            status:true
        },
    }).then(
        async(createArticle)=>{
            themeid=1;
            if(themeid){
                const themearticle = prisma.themeArticle.create({
                    data : {
                        themeId : parseInt(themeid),
                        articleId : parseInt(createArticle.id)
                    }
                })
            }
        }
    )
} 
exports.createTheme = async(title_ai) =>{
  const createTheme = await prisma.theme.create({
      data : {
          title : title_ai
      },
  }).then(
    ()=>{
      return createTheme;
    }
  )
} 


// async function generateText() {
 
// }


