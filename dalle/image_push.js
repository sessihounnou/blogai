/*import mysql from 'mysql';
import fs from 'fs';

const connection = mysql.createConnection({
    host: "localhost",
    user: "toss",
    password: "Bl@ckmamba24",
    database: "dalle2"
});

connection.connect();

const imagePath = "/home/DrToss/BIRIS/img/file.png";
const imageName = "file.png";

fs.readFile(imagePath, (imageData) => {

    const sql = "INSERT INTO images (name, file_path) VALUES (?, ?)";
    const values = [imageName, imageData];

    connection.query(sql, values, (result) => {
        console.log("Image ajoutée à la base de données avec succès.");
    });
});

connection.end();*/

//var mysql = require('mysql');
import mysql from 'mysql';

var con = mysql.createConnection(
  {
  host: "localhost",
  user: "toss",
  password: "Bl@ckmamba24",
  database: "dalle"
  }
);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO images (name, file_path) VALUES ('file.png', '/home/DrToss/BIRIS/img/file.png')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
