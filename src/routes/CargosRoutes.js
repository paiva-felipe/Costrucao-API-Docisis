const express = require('express')
const router = express.Router()
const CargosController = require('../controller/CargosController')

router.get('/', CargosController.listarCargos)
router.get('/:id', CargosController.buscarCargoId)
router.post('/', CargosController.cadastrarCargo)
router.put('/:id', CargosController.atualizarCargo)
router.delete('/:id', CargosController.deletarCargo)

module.exports = router