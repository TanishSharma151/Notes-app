const express = require('express');
const { handleAllNote, handleSpecificNote, handleNoteMake, handleNoteUpdate, handleNoteDeletion} = require('../controller/note.js');

const router = express.Router();

router.get('/', handleAllNote)

router.get('/:id', handleSpecificNote)

router.post('/', handleNoteMake);

router.put('/:id', handleNoteUpdate);

router.delete('/:id', handleNoteDeletion);

module.exports = router;