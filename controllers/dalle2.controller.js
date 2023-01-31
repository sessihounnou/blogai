const fs = require('fs');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
exports.generateImg = async(prompt, apikey) =>{
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
    axios.get(url, { responseType: 'stream' }).then(response => 
        {
            response.data.pipe(fs.createWriteStream('./ressources/assets/'+`${Date.now()}.png`))
        });
}).then(()=>{
    console.log("success");
    return "success"
}).catch((error)=>{
console.log(error);
})
}