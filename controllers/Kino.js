const Kino = require("../models/Kino");

const getAllCinemas = async (req, res) => {
    try{
        const kinos = await Kino.find();
        res.status(200).json(kinos);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const createCinema = async (req, res) => {
    const { name, strasse_nr, plz_ort, webseite } = req.body;
        //if required fields are empty:
        if(!name || !strasse_nr || !plz_ort || !webseite){
            return res.status(400).send("All fields are required");
        }
        //if user w/ email already exist:
        const [existingKino] = await Kino.find({name: name});
        if(existingKino){
            return res.status(400).send("There already is a cinema with this name.");
        }
    try{
        const newKino = await Kino.create({ name, strasse_nr, plz_ort, webseite });
        res.status(201).json(newKino);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const getSingleCinema = async (req, res) => {
    const { id } = req.params;
    try{
        const kino = await Kino.findById(id);
        res.status(200).json(kino);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const updateSingleCinema = async (req, res) => {
    const { id } = req.params;
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    try{
        const updatedKino = await Kino.findByIdAndUpdate(
            id,
            {name, strasse_nr, plz_ort, webseite},
            {new: true} //returns updated kino, otherwise outdated one
        );
        res.status(200).json(updatedKino);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const deleteSingleCinema = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedKino = await Kino.findByIdAndDelete(id);
        res.status(200).send(`The cinema with the id ${id} has successfully been deleted.`);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

module.exports = {
    getAllCinemas,
    createCinema,
    getSingleCinema,
    updateSingleCinema,
    deleteSingleCinema
}