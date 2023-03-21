const Club = require("../models/Club");

const getAllClubs = async (req, res) => {
    try{
        const clubs = await Club.find();
        res.status(200).json(clubs);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const createClub = async (req, res) => {
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    //if user w/ email already exist:
    const [existingClub] = await Club.find({name: name});
    if(existingClub){
        return res.status(400).send("There already is a club with this name.");
    }
    try{
        const newClub = Club.create({name, strasse_nr, plz_ort, webseite});
        res.status(201).json(newClub);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const getSingleClub = async (req, res) => {
    const { id } = req.params;
    try{
        const club = await Club.findById(id);
        res.status(200).json(club);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const updateSingleClub = async (req, res) => {
    const { id } = req.params;
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    try{
        const updatedClub = await Club.findByIdAndUpdate(
            id,
            {name, strasse_nr, plz_ort, webseite},
            {new: true}     //returns updated club, otherwise outdated one
        );
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const deleteSingleClub = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedClub = await Club.findByIdAndDelete(id);
        res.status(200).send(`The club with the id ${id} has successfully been deleted.`);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

module.exports = {
    getAllClubs,
    createClub,
    getSingleClub,
    updateSingleClub,
    deleteSingleClub
}