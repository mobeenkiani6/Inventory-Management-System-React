const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: Number,
    imageUrl: String,
});

const User = mongoose.model("users", UserSchema);
module.exports = User;