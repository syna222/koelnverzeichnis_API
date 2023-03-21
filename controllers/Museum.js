const Museum = require("../models/Museum");

const getAllMuseums = async (req, res) => {
    try{
        const museen = await Museum.find();
        res.status(200).json(museen);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const createMuseum = async (req, res) => {
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    //if user w/ email already exist:
    const [existingMuseum] = await Museum.find({name: name});
    if(existingMuseum){
        return res.status(400).send("There already is a museum with this name.");
    }
    try{
        const newMuseum = Museum.create({ name, strasse_nr, plz_ort, webseite });
        res.status(201).json(newMuseum);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

const getSingleMuseum = async (req, res) => {
    const { id } = req.params;
    try{
        const museum = await Museum.findById(id);
        res.status(200).json(museum);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const updateSingleMuseum = async (req, res) => {
    const { id } = req.params;
    const { name, strasse_nr, plz_ort, webseite } = req.body;
    //if required fields are empty:
    if(!name || !strasse_nr || !plz_ort || !webseite){
        return res.status(400).send("All fields are required");
    }
    try{
        const updatedMuseum = await Museum.findByIdAndUpdate(
            id,
            {name, strasse_nr, plz_ort, webseite},
            {new: true}     //returns updated museum, otherwise outdated one
        );
        res.status(200).json(updatedMuseum);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const deleteSingleMuseum = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedMuseum = await Museum.findByIdAndDelete(id);
        res.status(200).send(`The museum with the id ${id} has successfully been deleted.`);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}


module.exports = {
    getAllMuseums,
    createMuseum,
    getSingleMuseum,
    updateSingleMuseum,
    deleteSingleMuseum
}