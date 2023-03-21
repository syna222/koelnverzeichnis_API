const express = require("express");
const router = express.Router();
const {
    getAllMuseums,
    createMuseum,
    getSingleMuseum,
    updateSingleMuseum,
    deleteSingleMuseum
}           = require("../controllers/Museum");


router.route("/museen").get(getAllMuseums).post(createMuseum);
router.route("/museen/:id").get(getSingleMuseum).put(updateSingleMuseum).delete(deleteSingleMuseum);

module.exports = router;