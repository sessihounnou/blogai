import { Configuration, OpenAIApi } from "openai";
import { createReadStream, writeFileSync } from "fs";

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

const src = './shinji.png'

const result = await openai.createImageVariation(
    createReadStream(`./${src}`),
    1,
    "1024x1024"
)

const url = result.data.data[0].url;
console.log(url);

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() )
writeFileSync(`./img/${Date.now()}.png`, buffer);
