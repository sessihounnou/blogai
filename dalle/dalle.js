import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import axios from "axios";

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

const prompt = 'des usines qui poluent'

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: 'Toss 19'
});

const url = result.data.data[0].url;
console.log(url);

// const imgResult = await fetch(url);
// const blob = await imgResult.blob();
// const buffer = Buffer.from( await blob.arrayBuffer() )
// writeFileSync(`./img/${Date.now()}.png`, buffer);
