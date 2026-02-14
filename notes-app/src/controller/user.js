const USER = require('../models/user.js');
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        await USER.create({
            name,
            email,
            password,
        });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error in the handleUserSignUp controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        
        const user = await USER.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = setUser(user); 

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in handleUserLogin controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function handleUserUpdate(req, res) {
    try {
        const { email, password } = req.body;
        const updateUser = await USER.findByIdAndUpdate(req.params.id, { email, password }, { new: true });
        if (!updateUser) return res.status(404).json({ message: 'User not found' });
        res.status(201).json({ message: 'User updated' });
    }
    catch (error) {
        console.error("Error in the handleNoteUpdate controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleUserDeletion(req, res) {
    try {
        const deleteUser = await USER.findByIdAndDelete(req.params.id);
        if (!deleteUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error in the handleUserDeletion controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleLogout(req, res) {
  res.clearCookie("token"); 
  return res.json({ message: "Logged out successfully" });
}

async function viewAllUsers(req, res){
    try{
        const allUsers = await USER.find({});
        res.status(200).json({message : "Viewing all users", allUsers})
    }
    catch(err){
        console.log("Error found in viewing all users :", err);
        res.status(500).json({message : "Internal server error"})
    }
}

module.exports = {
    handleUserLogin,
    handleUserSignUp,
    handleUserUpdate,
    handleUserDeletion,
    handleLogout,
    viewAllUsers,
}