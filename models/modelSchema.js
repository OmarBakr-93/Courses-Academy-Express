const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    country: String,
    gender: String,
},
{ timestamps: true });

const User = mongoose.model('User', modelSchema);

module.exports = User;


