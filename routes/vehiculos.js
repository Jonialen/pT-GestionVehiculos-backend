const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

router.get('/', vehiculosController.obtenerTodos);
router.get('/:placa', vehiculosController.obtenerPorPlaca);
router.post('/', vehiculosController.crear);
router.put('/:placa', vehiculosController.actualizar);
router.delete('/:placa', vehiculosController.eliminar);

module.exports = router;

