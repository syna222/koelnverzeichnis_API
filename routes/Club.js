const express = require("express");
const router = express.Router();
const {
    getAllClubs,
    createClub,
    getSingleClub,
    updateSingleClub,
    deleteSingleClub
}               = require("../controllers/Club");

router.route("/clubs").get(getAllClubs).post(createClub);
router.route("/clubs/:id").get(getSingleClub).put(updateSingleClub).delete(deleteSingleClub);

module.exports = router;