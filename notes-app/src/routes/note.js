const express = require('express');
const {checkAuth, restrictToLoggedUserOnly} = require("../middleware/auth.js")
const { handleUserSpecificNote, handleSpecificNote, handleNoteMake, handleNoteUpdate, handleNoteDeletion} = require('../controller/note.js');

const router = express.Router();

router.get('/', checkAuth, restrictToLoggedUserOnly, handleUserSpecificNote)

router.get('/:id', checkAuth, restrictToLoggedUserOnly, handleSpecificNote)

router.post('/create', checkAuth, restrictToLoggedUserOnly, handleNoteMake);

router.put('/:id', checkAuth, restrictToLoggedUserOnly, handleNoteUpdate);

router.delete('/:id', checkAuth, restrictToLoggedUserOnly, handleNoteDeletion);

module.exports = router;