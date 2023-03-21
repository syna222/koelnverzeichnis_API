const mongoose = require("mongoose");

//Connectionstring MongoDB: zwischen / und ? die Collection spezifizieren:
//.....mongodb.net/mycollectionname?.....

const db = async (req, res) => {
    try {
        const URI = process.env.MONGO_URI;
        mongoose.set("strictQuery", true);
        mongoose.connect(URI);
        console.log("connected to db");
      } catch (err) {
        console.log(err);
        req.status(500).send("Could not connect to DB");
      }
};

module.exports = db;