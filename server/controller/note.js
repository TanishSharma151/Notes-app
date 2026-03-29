const NOTE = require('../models/notes.js');

// GET all notes (not deleted)
async function handleUserSpecificNote(req, res) {
  try {
    const notes = await NOTE.find({ userId: req.user.id, isDeleted: false });
    res.status(200).json(notes);
  } catch {
    res.status(500).json({ message: "Error fetching notes" });
  }
}

// GET deleted notes
async function handleUserSpecificDeletedNote(req, res) {
  try {
    const notes = await NOTE.find({ userId: req.user.id, isDeleted: true });
    res.status(200).json(notes);
  } catch {
    res.status(500).json({ message: "Error fetching deleted notes" });
  }
}

// GET single note
async function handleSpecificNote(req, res) {
  try {
    const note = await NOTE.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch {
    res.status(500).json({ message: "Error" });
  }
}

// CREATE
async function handleNoteMake(req, res) {
  try {
    const { title, content } = req.body;
    const note = await NOTE.create({
      title,
      content,
      userId: req.user.id,
      isDeleted: false
    });
    res.status(201).json(note);
  } catch {
    res.status(500).json({ message: "Error creating note" });
  }
}

// UPDATE
async function handleNoteUpdate(req, res) {
  try {
    await NOTE.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch {
    res.status(500).json({ message: "Error updating" });
  }
}

// 🔥 SOFT DELETE
async function handleNoteDeletion(req, res) {
  try {
    await NOTE.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Moved to trash" });
  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
}

// 🔥 RESTORE
async function handleUserSpecificDeletedNoteRestore(req, res) {
  try {
    await NOTE.findByIdAndUpdate(req.params.id, { isDeleted: false });
    res.json({ message: "Restored" });
  } catch {
    res.status(500).json({ message: "Error restoring" });
  }
}

// 🔥 PERMANENT DELETE
async function handlePermanentNoteDeletion(req, res) {
  try {
    await NOTE.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted permanently" });
  } catch {
    res.status(500).json({ message: "Error deleting permanently" });
  }
}


module.exports = {
  handleUserSpecificNote,
  handleUserSpecificDeletedNote,
  handleSpecificNote,
  handleNoteMake,
  handleNoteUpdate,
  handleNoteDeletion,
  handleUserSpecificDeletedNoteRestore,
  handlePermanentNoteDeletion,
};

