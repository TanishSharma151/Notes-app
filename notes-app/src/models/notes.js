const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title : {
        type : String,
        required:true,
    },
    content : {
        type : String, 
        required: true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true}
)

const NOTE = mongoose.model("Note", userSchema);

module.exports = NOTE;