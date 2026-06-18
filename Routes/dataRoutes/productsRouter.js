const { Router } = require('express')
const express = require('express')
const productController = require('../../Controller/productController')

const router = Router()

router.get('/', (req, res)=>(res.json({message: "Hello Fatoura server......."})))

router.get('/products', productController.getProducts)

module.exports = router