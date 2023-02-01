const fs = require('fs');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const  prisma = new PrismaClient()

const { Configuration, OpenAIApi } = require("openai");
// function generate img 
exports.generateImg = async(prompt, apikey , themeid) =>{
const configuration = new Configuration({
    apiKey: apikey
});

const openai = new OpenAIApi(configuration);

// const prompt = 'des usines qui poluent'
// const prompt = prompt
const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: 'Toss 19'
}).then((result)=>{
    const url = result.data.data[0].url;
    console.log(url);
    var  name =Date.now()+'.png'
    axios.get(url, { responseType: 'stream' }).then(response => 
        {
            response.data.pipe(fs.createWriteStream('./ressources/assets/'+name))
        });
    createImg(name,themeid)

}).then(()=>{
    console.log("success");
    return "success"
}).catch((error)=>{
console.log(error);
})
}
createImg = async(name ,themeid) =>{
    console.log("themeid");
    console.log(themeid);
    const createimg = await prisma.image.create({
        data : {
            name : name,
        },
    }).then(
        async(createimg)=>{
            console.log('img has been create ');
            console.log(themeid);
            if(themeid){
                const themearticle = prisma.themeImage.create({
                    data : {
                        themeId : parseInt(themeid),
                        imageId : parseInt(createimg.id)
                    }
                })
            }
        }
    )
} 