"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

// Constants
const PORT = process.env.PORT ||  1234;
const HOST = "0.0.0.0";

// App
const app = express();

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
    if (err) throw err;
    console.log("Mysql Connected with App...");
  });
  
  app.use(cors());
  