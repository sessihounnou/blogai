const { PrismaClient } = require('@prisma/client');
const CLIENT_URL = process.env.CLIENT_URL
const SERVER_URL = process.env.SERVER_URL

const axios = require('axios');
const API_KEY = process.env.API_KEY;

const  prisma = new PrismaClient()
const ai_article = async ()=>{
    const prompt = 'Génère 3 paragraphes de texte';

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        prompt,
        max_tokens: 1024,
        n: 3,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
  
      const paragraphs = response.data.choices[0].text.split('\n\n');
      return paragraphs;
    } catch (error) {
      console.error(error);
    }
}
exports.createArticle = async(data) =>{
    ai_article().then((paragraphs) => {
        paragraphs.forEach(paragraph => {
          console.log(paragraph);
        });
      });
    const createArticle = await prisma.article.create({
        data : {
            title : "",
            content: ""
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


async function generateText() {
 
}


