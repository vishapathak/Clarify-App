const mongoose = require('mongoose')

const Schema = mongoose.Schema

const company = new Schema(
    {
        userId: {type: String, require: true, unique: true},
        companyName: {type: String},
        entityId: {type: String},
        companyAddress: {type: String},
        gstNumber: {type: String},
        currencySelection: {type: String},
        decimal: {type: String},
        qrHeading: {type: String},
        eSign: {type: String}
    }
)

module.exports = mongoose.model('company', company)