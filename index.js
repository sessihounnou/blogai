
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const cron = require('cron');
const {generateText} = require("./controllers/openai.controller")
const { createArticle } = require("./controllers/article.controller");
// const { autoarticle } = require("./controllers/openai.controller");
const { generateImg } = require("./controllers/dalle2.controller");
const { article_getAll, article_create, article_update, article_delete } = require("./controllers/data_handle");

// Constants
const PORT = process.env.PORT || 8090;
const HOST = "localhost";
const openAiKey = "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"

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: true,methods: ["GET", "POST", "PUT", "DELETE"],credentials: true,}));

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
app.use(express.static('./ressources/assets'))
app.use(express.urlencoded({ extended: true }));

//generate dallee img
// generateImg('des usines qui poluent' , openAiKey , 1)

const create_funny = async(req,res) => {
  // console.log(req.body.prompt);
  let prompt = req.body.prompt
  generateImg(prompt, openAiKey , 1).then((response)=>{
    console.log(response);
    req.image = response
    generateText(prompt).then(
      (response)=>{
        console.log("text");
        console.log(response);
        createArticle(prompt,response,req.image ).then(()=>{
         res.status(201).json("success !");
         return "success" 
        })
      }
    );
  })
}
// create_funny ({prompt : "hello !"})

//Routes
/******/
app.get("/articles/:id", article_getAll);

app.post("/articles", article_create);

app.post("/search", create_funny);


app.put("/articles/:id", article_update);

app.delete("/articles/:id", article_delete);

app.post("/generate", generate_text);
/******/


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

// cron 

// job_theme.start();