import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import axios from "axios";


exports.generateImg = async(prompt, apikey) =>{
const configuration = new Configuration({
    apiKey: apikey
});

const openai = new OpenAIApi(configuration);

// const prompt = 'des usines qui poluent'
const prompt = prompt

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: 'Toss 19'
}).then((result)=>{
    const url = result.data.data[0].url;
    console.log(url);

    axios.get(url, {responseType: 'blob'}).then(response => {
        const blob =url.blob();
        const buffer = async()=>{
            return Buffer.from( await blob.arrayBuffer() )
        }
    writeFileSync(`./img/${Date.now()}.png`, buffer);   

    });
}).catch((error)=>{
console.log(error);
})


}
// const imgResult = await fetch(url);
// const blob = await imgResult.blob();
// const buffer = Buffer.from( await blob.arrayBuffer() )
// writeFileSync(`./img/${Date.now()}.png`, buffer);
