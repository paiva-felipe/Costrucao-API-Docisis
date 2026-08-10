const express = require('express')
const router = express.Router()
const ProdutoController = require('../controller/ProdutosController')
 
router.get('/', ProdutoController.listarProdutos)
 
module.exports = router