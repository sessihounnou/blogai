
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const cron = require('cron');
//import controllers
const { createArticle } = require("./controllers/article.controller");
const {generateText} = require("./controllers/openai.controller")
// Constants
const PORT = process.env.PORT || 8080;
const HOST = "localhost";

// App
const app = express();

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
const job = new cron.CronJob('30 * * * * *', function() {
  generateText("utiliser gt3 pour generer du contenu est ce du plagiat ").then(
    (response)=>{
      createArticle('sujet',response )
    }
  );

});
const job_theme = new cron.CronJob('*/30 * * * * *', function() {
  generateText("Propose moi Une idée de projet iot ").then(
    (response)=>{
      createTheme(response )
    }
  );

});
job.start();
job_theme.start();
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});