const express = require('express');
const { restrictToLoggedUserOnly } = require("../middleware/auth.js");

const {
  handleUserSpecificNote,
  handleSpecificNote,
  handleNoteMake,
  handleNoteUpdate,
  handleNoteDeletion,
  handleUserSpecificDeletedNote,
  handleUserSpecificDeletedNoteRestore,
  handlePermanentNoteDeletion
} = require('../controller/note.js');

const router = express.Router();

router.get('/deleted', restrictToLoggedUserOnly, handleUserSpecificDeletedNote);

router.get('/', restrictToLoggedUserOnly, handleUserSpecificNote);
router.get('/:id', restrictToLoggedUserOnly, handleSpecificNote);

router.post('/create', restrictToLoggedUserOnly, handleNoteMake);
router.put('/:id', restrictToLoggedUserOnly, handleNoteUpdate);

// Soft DELETE 
router.put('/:id/delete', restrictToLoggedUserOnly, handleNoteDeletion);

//  RESTORE
router.put('/:id/restore', restrictToLoggedUserOnly, handleUserSpecificDeletedNoteRestore);

//  PERMANENT DELETE
router.delete('/:id/permanent', restrictToLoggedUserOnly, handlePermanentNoteDeletion);

module.exports = router;
