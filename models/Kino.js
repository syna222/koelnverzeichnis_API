const mongoose = require("mongoose");

//Schema-Blueprint aus Library destrukturieren:
const { Schema } = mongoose;

//Neue Schema-Instanz erstellen:
const Kino = new Schema({
    name:{
        type: String,
        required: true
    },
    strasse_nr:{
        type: String,
        required: true
    },
    plz_ort:{
        type: String,
        required: true
    },
    webseite:{
        type: String,
        required: true
    }
});

//export Schema as the model ("CollectionName", Schema, optionales 3. Arg falls Collectionname nicht/anders pluralisiert werden soll):
module.exports = mongoose.model("kinos", Kino, "kinos");