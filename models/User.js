const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    registerDate: { type: Date, default: Date.now() },
});

const User = model("User", userSchema);

module.exports = User;