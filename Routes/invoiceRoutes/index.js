const express = require('express')
const Invoice = require('../../Controller/invoiceController')
const Authentication = require('../../Middlewares/Authorization')

const router = express.Router();

router.get('/invoice',  Authentication.verifyToken, Invoice.getInvoice)
router.get('/view/invoice/:id',  Authentication.verifyToken, Invoice.viewInvoice)
router.post('/invoice', Authentication.verifyToken,  Invoice.postInvoice)

module.exports = router