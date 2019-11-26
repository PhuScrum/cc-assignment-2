const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
 fName: {type: String},
 lName: {type: String},
 email: {type: String, unique: true},
 phoneNumber: {type: String},
 gender: {type: String},
 age: {type: Number},
 imageUrl: {type: String},
 type: {type: String},
 dateCreated: {type: Date, default: Date.now}

})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
