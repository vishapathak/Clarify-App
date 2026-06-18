const express = require('express')
const Authentication = require('../../Middlewares/Authorization')
const companyController = require('../../Controller/companyController')

const router = express.Router();

router.get('/company', Authentication.verifyToken, companyController.getCompany)
router.post('/company', Authentication.verifyToken, companyController.postCompany)
router.put('/company', Authentication.verifyToken, companyController.updateCompany)

module.exports = router