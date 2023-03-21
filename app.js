require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

//routes anfordern:
const musRouter = require("./routes/Museum");
const kinRouter = require("./routes/Kino");
const cluRouter = require("./routes/Club");
const galRouter = require("./routes/Galerie");

//database:
const db = require("./db/db");
db();

//parst Daten aus req.body (kommend aus HTML Formularen)
app.use(express.urlencoded({ extended: true }));

//parst JSON Daten aus req.body (kommend aus NICHT-HTML Formularen)
app.use(express.json());

//erlaubt Zugriff unabhängig vom Client
app.use(cors());


//routes anwenden:
app.use("/", musRouter, kinRouter, cluRouter, galRouter); //die anderen hier anhängen!

//startroute:
app.get("/", (req, res) => res.send('Willkommen auf der API für Kölns Clubs ("/clubs"), Galerien ("/galerien"), Kinos ("/kinos") und Museen ("/museen")!'))   //nicht Daten auf Initialroute zurückgeben!!


app.listen(port);








