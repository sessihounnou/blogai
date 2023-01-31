
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const cron = require('cron');
//import controllers
const { createArticle } = require("./controllers/article.controller");
const {generateText} = require("./controllers/openai.controller")
const {generateImg} = require("./controllers/dalle2.controller")
// const {generateImg} =require("./dalle/dalle")

const { article_getAll , article_create ,article_update ,article_delete }= require("./controllers/data_handle")

// Constants
const PORT = process.env.PORT || 8080;
const HOST = "localhost";
const openAiKey = "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"
// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Make sure you place body-parser before your CRUD handlers!



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//generate dallee img
generateImg('des usines qui poluent' , openAiKey)

// // cron 
// let sbj = "storyTelling"
// let sujet ="comment acceder au service de la carte sim grace a une esp32"
// const job = new cron.CronJob('30 * * * * *', function() {
//   // generateText("utiliser gt3 pour generer du contenu est ce du plagiat ").then(
//     generateText(sujet).then(
//     (response)=>{
//       createArticle(sbj,response )
//     }
//   );

// });
// // const job_theme = new cron.CronJob('*/30 * * * * *', function() {
// //   generateText("Propose moi Une idée de projet iot ").then(
// //     (response)=>{
// //       createTheme(response )
// //     }
// //   );

// // });
// job.start();
// // job_theme.start();



//Routes
/******/
app.get("/articles/:id", article_getAll);

app.post("/articles", article_create);

app.put("/articles/:id", article_update);

app.delete("/articles/:id", article_delete);
/******/


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
