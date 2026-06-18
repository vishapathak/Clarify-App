const express = require('express')
const Bill = require('../../Controller/billController')
const Authentication = require('../../Middlewares/Authorization')

const router = express.Router();

router.get('/bill', Authentication.verifyToken, Bill.getBills)
router.get('/view/bill/:id',  Authentication.verifyToken, Bill.viewBill)
router.post('/bill', Authentication.verifyToken, Bill.postBills)

module.exports = router 