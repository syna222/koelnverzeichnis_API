const Galerie = require("../models/Galerie");

const getAllGalerien = async (req, res) => {
    try{
        const museen = await Galerie.find();
        res.status(200).json(museen);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const createGalerie = async (req, res) => {
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    //if user w/ email already exist:
    const [existingGalerie] = await Galerie.find({name: name});
    if(existingGalerie){
        return res.status(400).send("There already is a gallery with this name.");
    }
    try{
        const newGalerie = Galerie.create({ name, strasse_nr, plz_ort, webseite });
        res.status(201).json(newGalerie);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const getSingleGalerie = async (req, res) => {
    const { id } = req.params;
    try{
        const galerie = await Galerie.findById(id);
        res.status(200).json(galerie);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const updateSingleGalerie = async (req, res) => {
    const { id } = req.params;
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    try{
        const updatedGalerie = await Galerie.findByIdAndUpdate(
            id,
            {name, strasse_nr, plz_ort, webseite},
            {new: true}     //returns updated galerie, otherwise outdated one
        );
        res.status(200).json(updatedGalerie);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const deleteSingleGalerie = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedGalerie = await Galerie.findByIdAndDelete(id);
        res.status(200).send(`The gallery with the id ${id} has successfully been deleted.`);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

module.exports = {
    getAllGalerien,
    createGalerie,
    getSingleGalerie,
    updateSingleGalerie,
    deleteSingleGalerie
}