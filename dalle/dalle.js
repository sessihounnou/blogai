import { Configuration, OpenAIApi } from "openai";
import { createReadStream, writeFileSync } from "fs";

async function generateImage(prompt) {
    const configuration = new Configuration({
        apiKey: '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'
    });

    const openai = new OpenAIApi(configuration);

//    const prompt = 'naruto qui fait du skate sur namek'

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
}

async function imageVariation(src) {
    const configuration = new Configuration({
        apiKey: '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'
    });

    const openai = new OpenAIApi(configuration);

//    const src = './shinji.png'

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
}

async function editImage (src, mask) {
    const configuration = new Configuration({
        apiKey: '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'
    });

    const openai = new OpenAIApi(configuration);

//    const src = './shinji.png'

    const result = await openai.createImageEdit(
        createReadStream(src),
        createReadStream(mask),
        'une licorne qui dunk',
        1,
        "1024x1024"
    )

    const url = result.data.data[0].url;
    console.log(url);

    const imgResult = await fetch(url);
    const blob = await imgResult.blob();
    const buffer = Buffer.from( await blob.arrayBuffer() )
    writeFileSync(`./img/${Date.now()}.png`, buffer);
}

generateImage("Dark Vador dans un champ de rose");
