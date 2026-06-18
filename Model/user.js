const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
    fname: {type: String, require: true},
    lname: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    password: {type: String, require: true},
    referaral: {type: String},
    companyName: {type: String},
    entityId: {type: String},
    companyAddress: {type: String},
    companyQrHeading: {type: String}
}, {timestamps: true})

module.exports = mongoose.model("user", user)