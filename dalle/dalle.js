import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

const prompt = 'naruto qui fait du skate sur namek'

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: 'Toss 19'
});

const url = result.data.data[0].url;
console.log(url);

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() )
writeFileSync(`./img/${Date.now()}.png`, buffer);
