const NOTE = require('../models/notes.js');

async function handleSpecificNote(req,res) {
    try{
        const specficNote = await NOTE.findOne({_id: req.params.id, isDeleted : false});
        if(!specficNote) return res.status(404).json({message:'Note not found'});
        res.status(200).json(specficNote);
    }
    catch(error){
        console.error("Error in the handleSpecificNote controller");
        res.status(500).json({message:"Internal server error"});
    }
}

async function handleUserSpecificNote(req,res) {
    try{
        const userId = req.user.id;
        const notes = await NOTE.find({userId, isDeleted: false});
        res.status(200).json(notes);
        
    }
    catch(err){
        console.log("Error found with user specific notes");
        res.status(500).json({message : "Internal server error"});
    }
}


async function handleNoteMake(req, res) {
    try{
        const {title, content} = req.body;
        const note = new NOTE({title, content, userId: req.user.id});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }
    catch(error){
        console.error("Error in the handleNoteUpdate controller");
        res.status(500).json({message : 'Internal server error'});
    }
}

async function handleNoteUpdate(req, res) {
    try{
    const {title, content} = req.body;
    const updatedNote = await NOTE.findByIdAndUpdate(req.params.id,{title,content}, {new:true});
    if(!updatedNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json({message:'Note updated'});
    }
    catch(error){
        console.error("Error in the handleNoteUpdate controller");
        res.status(500).json({message:"Internal server error"});
    }
}

async function handleNoteDeletion(req, res) {
    try{
    const deletedNote = await NOTE.findByIdAndUpdate(req.params.id, {isDeleted : true});
    if(!deletedNote) return res.status(404).json({message:'Note doesnt exist'});
    res.status(200).json({message:"Note deleted"});
    }
    catch(error){
        console.error("Error in the handleNoteDeletion controller");
        res.status(500).json({message:"Internal server error"});
    }
}

async function handlePermanentNoteDeletion(req, res) {
    try{
    const deletedNote = await NOTE.findByIdAndDelete(req.params.id);
    if(!deletedNote) return res.status(404).json({message:'Note doesnt exist'});
    res.status(200).json({message:"Note deleted"});
    }
    catch(error){
        console.error("Error in the handleNoteDeletion controller");
        res.status(500).json({message:"Internal server error"});
    }
}

async function handleUserSpecificDeletedNote(req,res) {
    try{
        const userId = req.user.id;
        const notes = await NOTE.find({userId, isDeleted: true});
        res.status(200).json(notes);
        
    }
    catch(err){
        console.log("Error found with user specific deleted notes");
        res.status(500).json({message : "Internal server error"});
    }
}

async function handleUserSpecificDeletedNoteRestore(req,res) {
    try{
        const userId = req.user.id;
        const notesRestore = await NOTE.findByIdAndUpdate(req.params.id, {isDeleted: false});
        res.status(200).json({message : "Notes Restored"});
        
    }
    catch(err){
        console.log("Error found with user specific deleted notes");
        res.status(500).json({message : "Internal server error"});
    }
}



module.exports = {
    handleSpecificNote,
    handleNoteMake,
    handleNoteUpdate,
    handleNoteDeletion,
    handleUserSpecificNote,
    handleUserSpecificDeletedNote,
    handleUserSpecificDeletedNoteRestore,
    handlePermanentNoteDeletion,
}