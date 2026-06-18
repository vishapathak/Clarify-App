const express = require('express')
const purchase = require('../../Controller/purchaseOrderController')
const Authentication = require('../../Middlewares/Authorization')

const router = express.Router();

router.get('/purchase',  Authentication.verifyToken, purchase.getPurchareOrder)
router.get('/view/purchase/:id',  Authentication.verifyToken, purchase.viewPurchase)
router.post('/purchase', Authentication.verifyToken,  purchase.postPurchareOrder)

module.exports = router