/*
    Rutas para la carga de archivos
    host + api/carga
*/

const { Router } = require('express');

const { check, body } = require('express-validator');

const { chargeFiles } = require('../controllers/files');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/new', 
    [ //Middlewares
        body().isArray(),
        body('*.filename', 'El nombre del archivo es obligatorio').not().isEmpty(),
        body('*.objectArray', 'El contenido del archivo es obligatorio').isArray().not().isEmpty(),
        validarCampos
    ], 
    chargeFiles
);

module.exports = router;