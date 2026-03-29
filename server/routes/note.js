const express = require('express');
const { checkAuth, restrictToLoggedUserOnly } = require("../middleware/auth.js");

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

// 🔥 ORDER MATTERS
router.get('/deleted', checkAuth, restrictToLoggedUserOnly, handleUserSpecificDeletedNote);

router.get('/', checkAuth, restrictToLoggedUserOnly, handleUserSpecificNote);
router.get('/:id', checkAuth, restrictToLoggedUserOnly, handleSpecificNote);

router.post('/create', checkAuth, restrictToLoggedUserOnly, handleNoteMake);
router.put('/:id', checkAuth, restrictToLoggedUserOnly, handleNoteUpdate);

// 🔥 DELETE (soft)
router.put('/:id/delete', checkAuth, restrictToLoggedUserOnly, handleNoteDeletion);

// 🔥 RESTORE
router.put('/:id/restore', checkAuth, restrictToLoggedUserOnly, handleUserSpecificDeletedNoteRestore);

// 🔥 PERMANENT DELETE
router.delete('/:id/permanent', checkAuth, restrictToLoggedUserOnly, handlePermanentNoteDeletion);

module.exports = router;