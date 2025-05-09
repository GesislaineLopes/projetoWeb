const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/cadastrar', produtoController.cadastrar);
router.post('/salvar', produtoController.salvar);
router.get('/relatorio', produtoController.relatorio);
router.get('/detalhar/:id', produtoController.detalhar);

module.exports = router;
