const express = require('express');
const { handleUserLogin, handleUserSignUp, handleUserUpdate, handleUserDeletion, handleLogout, viewAllUsers} = require('../controller/user.js');

const router = express.Router();

router.post('/signup', handleUserSignUp);

router.post('/login', handleUserLogin);

router.post('/logout', handleLogout);

router.put('/:id', handleUserUpdate);

router.delete('/:id', handleUserDeletion);

router.get('/all-users', viewAllUsers)

module.exports = router;