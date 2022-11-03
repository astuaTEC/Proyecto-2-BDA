/*
    Rutas para la carga de archivos
    host + api/catalog
*/

const { Router } = require('express');

const { check, body } = require('express-validator');

const { obtenerMarcas, obtenerProductos, crearProducto, eliminarProducto, actualizarProducto, registrarCompras } = require('../controllers/catalog');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/new', 
    [ //Middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
    ], 
    crearProducto
);

router.post(
    '/compras/new', 
    [ //Middlewares
        body().isArray().isLength(4),
        body('*.idCliente', 'El idCliente del archivo es obligatorio').not().isEmpty(),
        body('*.idProducto', 'El idProducto es obligatorio').not().isEmpty(),
        body('*.cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    registrarCompras
);

router.get('/brands', obtenerMarcas);

router.get('/products', obtenerProductos);

router.delete('/delete/:id', eliminarProducto);

router.put(
    '/update',
    [ //Middlewares
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
    ],
    actualizarProducto
)

module.exports = router;