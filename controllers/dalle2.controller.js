const fs = require('fs');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const  prisma = new PrismaClient()

const { Configuration, OpenAIApi } = require("openai");
// function generate img 
exports.generateImg = async(prompt, apikey , themeid) =>{
    var endOf;
    const configuration = new Configuration({
        apiKey: apikey
    });
    const openai = new OpenAIApi(configuration);
    const result = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        user: 'Toss 19'
    }).then((result)=>{
        const url = result.data.data[0].url;
        var  name =Date.now()+'.png'
        axios.get(url, { responseType: 'stream' }).then(response => 
            {
                response.data.pipe(fs.createWriteStream('./ressources/assets/'+name))
            });
       const nameof =  createImg(name,themeid).then((response)=>{
            // return response
        })
        console.log(name);
        endOf = name
        return  name

    })
    return endOf
}
createImg = async(name ,themeid) =>{
    let response
    const createimg = await prisma.image.create({
        data : {
            name : name,
        },
    }).then(
        async(createimg)=>{
            response = createimg
            // if(themeid){
            //     const themearticle = prisma.themeImage.create({
            //         data : {
            //             themeId : parseInt(themeid),
            //             imageId : parseInt(createimg.id)
            //         }
            //     })
            // }
        }
    )
    return response
} 