const express = require("express");
const router = express.Router();
const {
    getAllGalerien,
    createGalerie,
    getSingleGalerie,
    updateSingleGalerie,
    deleteSingleGalerie
}               = require("../controllers/Galerie");

router.route("/galerien").get(getAllGalerien).post(createGalerie);
router.route("/galerien/:id").get(getSingleGalerie).put(updateSingleGalerie).delete(deleteSingleGalerie);

module.exports = router;