/*
    Rutas para la carga de archivos
    host + api/clients
*/

const { Router } = require('express');

const { check, body } = require('express-validator');

const { getClientePorId, getTodosLosClientes, 
    crearCliente, eliminarCliente, actualizarCliente, getClientePorNombre } = require('../controllers/clients');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post(
    '/new', 
    [ //Middlewares
    check('first_name', 'El first_name es obligatorio').not().isEmpty(),
    check('last_name', 'El last_name es obligatorio').not().isEmpty(),
    validarCampos
    ], 
    crearCliente
);

router.put(
    '/update',
    [ //Middlewares
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('first_name', 'El first_name es obligatorio').not().isEmpty(),
    check('last_name', 'El last_name es obligatorio').not().isEmpty(),
    validarCampos
    ],
    actualizarCliente
)

router.get('/get/id/:id', getClientePorId);

router.get('/get/name/:user', getClientePorNombre);

router.get('/all', getTodosLosClientes);

router.delete('/delete/:id', eliminarCliente);


module.exports = router;