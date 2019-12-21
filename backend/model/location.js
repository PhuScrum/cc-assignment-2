const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    lat:{type: Number},
    lng: {type: Number},
    name: {type: String},
    description: {type: String},
    address: {type: String},
    time: {type: String},
    startDate: {type: String},
    endDate: {type: String},
    input: {type: Object},
    members: {type: Array},
    locationOwner: {type: String},
    dateCreated: {type: Date, default: Date.now}
   })

const locationModel = mongoose.model('location', locationSchema)

module.exports = locationModel
