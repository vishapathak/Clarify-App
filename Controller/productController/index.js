const products = require('../../Model/products')

const getProducts = async (req, res) =>{
    const productList = await products.find()
    return res.send(productList);
}

module.exports = {getProducts}
