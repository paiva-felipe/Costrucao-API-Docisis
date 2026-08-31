const express = require('express')
const router = express.Router()
 
const produtosRoutes = require('./ProdutosRoutes')
 
router.use('/produtos', produtosRoutes)

const CargosRoutes = require('./CargosRoutes')
 
router.use('/cargos', CargosRoutes)

const EntradaRoutes = require('./EntradaRoutes')
 
router.use('/entradas', EntradaRoutes)

const EstoqueRoutes = require('./EstoqueRoutes')
 
router.use('/estoque', EstoqueRoutes)

const FornecedorRoutes = require('./FornecedorRoutes')
 
router.use('/fornecedores', FornecedorRoutes)

const FuncionariosRoutes = require('./FuncionariosRoutes')
 
router.use('/funcionarios', FuncionariosRoutes)

const NotaFiscalRoutes = require('./NotaFiscalRoutes')
 
router.use('/nota', NotaFiscalRoutes)

const PedidoRoutes = require('./PedidoRoutes')
 
router.use('/pedidos', PedidoRoutes)

const SaidaRoutes = require('./SaidaRoutes')
 
router.use('/saidas',SaidaRoutes)

const RelatorioRoutes = require('./RelatorioRoutes')
router.use('/relatorios', RelatorioRoutes)
 
module.exports = router