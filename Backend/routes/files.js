/*
    Rutas para la carga de archivos
    host + api/files
*/

const { Router } = require('express');

const { check, body } = require('express-validator');

const { createNodesFromUrl, countNodesInDB } = require('../controllers/files');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/new', 
    [ //Middlewares
        body().isArray().isLength(4),
        body('*.filename', 'El nombre del archivo es obligatorio').not().isEmpty(),
        body('*.url', 'El url es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    createNodesFromUrl
);

router.get('/status', countNodesInDB);

module.exports = router;