const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let today = new Date().toLocaleDateString();
const bill = new Schema({
  type: { type: String, default: "Bill" },
  userId: { type: String, require: true },
  billNumber: { type: String },
  billDate: { type: String, default: today },
  dueDate: { type: String },
  referenceNumber: { type: String },
  customerName: { type: String, require: true },
  billingAddress: { type: String, require: true },
  shippingAddress: { type: String },
  description: { type: String },
  termsAndCondition: { type: String },
  companyLogo: { type: String },
  companyName: { type: String, require: true },
  companyAddress: { type: String },
  gstNumber: { type: String },
  items: [
    {
      itemName: String,
      sku: Number,
      quantity: Number,
      unitPrice: Number,
    },
  ],
  paymentStatus: { type: String, default: "unpaid" },
}, {timestamps: true});

module.exports = mongoose.model("bill", bill);
