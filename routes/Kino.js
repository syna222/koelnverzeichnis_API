const express = require("express");
const router = express.Router();
const {
    getAllCinemas,
    createCinema,
    getSingleCinema,
    updateSingleCinema,
    deleteSingleCinema
}               = require("../controllers/Kino");


router.route("/kinos").get(getAllCinemas).post(createCinema);
router.route("/kinos/:id").get(getSingleCinema).put(updateSingleCinema).delete(deleteSingleCinema);

module.exports = router;