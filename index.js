
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const cron = require('cron');
//import controllers
const { createArticle } = require("./controllers/article.controller");
const {generateText} = require("./controllers/openai.controller")
const { article_getAll , article_create ,article_update ,article_delete }= require("./controllers/data_handle")

// Constants
const PORT = process.env.PORT || 8080;
const HOST = "localhost";

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
/******/
app.get("/articles", article_getAll);

app.post("/articles", article_create);

app.put("/articles/:id", article_update);

app.delete("/articles/:id", article_delete);
/******/


let sbj = "storyTelling"
// let sujet = "puis je avoir une petite storytelling très originale faisant appel aux émotions de l'utilisateur sur un systeme d'information des zones de polution et des taux de pollution ainsi que les particules présente dans l'aire. il faut que l'histoire soit lisible du début à la fin mais aussi de la fin au début"
let sujet ="comment acceder au service de la carte sim grace a une esp32"
const job = new cron.CronJob('30 * * * * *', function() {
  // generateText("utiliser gt3 pour generer du contenu est ce du plagiat ").then(
    generateText(sujet).then(
    (response)=>{
      createArticle(sbj,response )
    }
  );

});
// const job_theme = new cron.CronJob('*/30 * * * * *', function() {
//   generateText("Propose moi Une idée de projet iot ").then(
//     (response)=>{
//       createTheme(response )
//     }
//   );

// });
job.start();
// job_theme.start();
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
