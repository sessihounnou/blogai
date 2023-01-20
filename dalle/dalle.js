import { Configuration, OpenAIApi } from "openai";
import { createReadStream, writeFileSync } from "fs";
import ig from "ig-scraper";
//const ig = require('ig-scraper');
import Client from 'instagram-web-api';

const client = new Client();

async function postImage(user, mdp) {
    client.session.login({
      username: user,
      password: mdp
    }).then(() => {
      const image = fs.readFileSync('./img/image.png');

      return client.media.upload({
        file: image,
        caption: 'Generated'
      });
    }).then((media) => {
      console.log(`Image téléchargée avec succès avec l'ID ${media.id}`);
    }).catch((err) => {
      console.log(`Erreur: ${err}`);
    });
}

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

generateImage("un gay pendant la fin du monde");
//postImage("", "");
