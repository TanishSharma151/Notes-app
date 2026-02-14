const jwt = require('jsonwebtoken');
const secret = 'QwErTy1@3$5';

function setUser(user) {
    return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1h" });
}

function getUser(token){
    try{
        return jwt.verify(token, secret);
    }
    catch(error){
        console.error("Error in the  getUser function");
    }
}

module.exports = {
    setUser, 
    getUser,
}