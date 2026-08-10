const express = require('express')
const router = express.Router()
 
const produtosRoutes = require('./ProdutosRoutes')
 
router.use('/produtos', produtosRoutes)
 
module.exports = router