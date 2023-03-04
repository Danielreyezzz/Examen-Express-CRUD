"use strict";

let express = require("express"),
  app = express();
app.use(express.static(__dirname + "/public/"));
//ruta = app.use(express.static(__dirname + '/assets/'));


app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");


app.use("/", require("./router/rutas"));

const mongoose = require("mongoose");

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require('dotenv').config();
let port = process.env.PORT || 3000;

const user = "dani";
const password = "QcwkFwk7iHTyZVOy";
const dbname = "bares";
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@bares.fosaa4v.mongodb.net/?retryWrites=true&w=majority`;
//mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@bares.fosaa4v.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority
app.use("/bar", require("./router/bar"));
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(e));

app
  .get("/", (req, res) => {
    res.render("index", { titulo: "mi título dinámico" });
    //res.sendFile(ruta + 'index.html')
  })
  .get("/contacto", (req, res) => {
    res.render("contacto", {
      tituloContacto: "Estamos en contacto de manera dinámica!",
    });
  })
  .use((req, res) => {
    res.status(404).render("404", {
      titulo: "Error 404",
      descripcion: "Page not found",
    });
  })
  .listen(port);

console.log("Iniciando Express en el puerto 3000");