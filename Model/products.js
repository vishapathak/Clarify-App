const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema({
    name: {type: String},
    size: {type: String, required: true},
    price: {type: Number, required: true},
    discription: {type: String, required: true},
    image: {type: String, required: true}
})
module.exports = mongoose.model("product", product)