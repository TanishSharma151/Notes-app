const express = require('express');
const {checkAuth, restrictToLoggedUserOnly} = require("../middleware/auth.js")
const { handleUserSpecificNote, handleSpecificNote, handleNoteMake, handleNoteUpdate, handleNoteDeletion, handlePermanentNoteDeletion, handleUserSpecificDeletedNoteRestore, handleUserSpecificDeletedNote} = require('../controller/note.js');

const router = express.Router();

router.get('/', checkAuth, restrictToLoggedUserOnly, handleUserSpecificNote)

router.get('/deleted', checkAuth, restrictToLoggedUserOnly, handleUserSpecificDeletedNote);

router.get('/:id', checkAuth, restrictToLoggedUserOnly, handleSpecificNote)

router.put('/:id/restore', checkAuth, restrictToLoggedUserOnly, handleUserSpecificDeletedNoteRestore);

router.post('/create', checkAuth, restrictToLoggedUserOnly, handleNoteMake);

router.put('/:id', checkAuth, restrictToLoggedUserOnly, handleNoteUpdate);

router.delete('/:id', checkAuth, restrictToLoggedUserOnly, handleNoteDeletion);

router.delete('/:id/permanent', checkAuth, restrictToLoggedUserOnly, handlePermanentNoteDeletion);

module.exports = router;