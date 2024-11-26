const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
}, {
    timestamps: true,
});

userSchema.methods.isValidPassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;