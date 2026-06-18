const Invoice = require("../../Model/invoice");

module.exports.getInvoice = async (req, res) => {
  const userInvoices = await Invoice.find({ userId: req.token_data._id });
  res.json({
    error: false,
    success: true,
    invoice: userInvoices,
  });
};

module.exports.postInvoice = async (req, res) => {
  const {
    invoiceDate,
    dueDate,
    referenceNumber,
    customerName,
    billingAddress,
    shippingAddress,
    description,
    termsAndCondition,
    eSign,
    companyLogo,
    companyName,
    companyAddress,
    entityId,
    gstNumber,
    qrHeading,
    qrImage,
    itemArray,
  } = req.body;
  if (!customerName || !billingAddress || !companyName) {
    res.status(501).json({
      error: true,
      success: false,
      message: "Some of the requried fields are missing!!!",
    });
  } else if (
    itemArray.length < 1 ||
    itemArray === undefined ||
    itemArray === null
  ) {
    res.status(501).json({
      error: true,
      success: false,
      message: "Insufficient Items!!!",
    });
  } else {
    const prevInvoices = await Invoice.find({ userId: req.token_data._id });
    var date = new Date().toLocaleDateString();

    date = date.split("/");
    const invid = prevInvoices.length + 1;
    const year = date[2];

    var invoiceId = "INV" + year + "-" + "0000" + invid;

    const invoice = {
      userId: req.token_data._id,
      invoiceNumber: invoiceId,
      invoiceDate,
      dueDate,
      referenceNumber,
      customerName,
      billingAddress,
      shippingAddress,
      description,
      termsAndCondition,
      eSign,
      companyLogo,
      companyName,
      companyAddress,
      entityId,
      gstNumber,
      qrHeading,
      qrImage,
      items: JSON.parse(itemArray),
    };
    
    await Invoice.create(invoice)
      .then(() => {
        res.status(200).json({
          error: false,
          success: true,
          message: "Invoice created successfully....",
        });
      })
      .catch((err) => {
        res.status(501).json({
          error: true,
          success: false,
          message:
            "An internal server error has been occurred while creating invoice!!!",
        });
      });
  }
};

module.exports.viewInvoice = async (req, res) => {
  var id = req.params.id;
  await Invoice.find({ _id: id })
    .then((response) => {
      res.json({
        invoice: response,
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
};

// userId: {type: String, require: true}, need to find using token

// Invoice test data

// {
// 	"invoiceNumber": "INV2022-00001",
//  "invoiceDate": "14/12/2022",
//  "dueDate": "16/12/2022",
//  "referenceNumber": "123",
//  "customerName": "Darshan Boyat",
//  "billingAddress": "XYZ",
//  "shippingAddress": "XYZ",
//  "description": "Test invoice",
//  "termsAndCondition": "Test invoice",
//  "eSign": "Admin",
//  "companyName": "BI",
//  "companyAddress": "Shekhar central",
//  "entityId": "456",
//  "gstNumber": "75369",
//  "itemArray": "1"
// }
