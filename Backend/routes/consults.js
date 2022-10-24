/*
    Rutas para la carga de archivos
    host + api/clients
*/

const { Router } = require('express');

const { check, body } = require('express-validator');

const { getTopCompras, getTopSeparateCompras, getTopBrands, getTopClients, getSearchClient, getCommonProduct, getCommonClient} = require('../controllers/consults');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/top/purchases', getTopCompras);
router.get('/top/separate_purchases', getTopSeparateCompras);


router.get('/top/brands', getTopBrands);

router.get('/top/clients', getTopClients);

router.get('/top/client/search',[ //Middlewares
check('first_name', 'El first_name es obligatorio').not().isEmpty(),
check('last_name', 'El last_name es obligatorio').not().isEmpty(),
validarCampos
], getSearchClient);

router.get('/special/client',[ //Middlewares
check('first_name', 'El first_name es obligatorio').not().isEmpty(),
check('last_name', 'El last_name es obligatorio').not().isEmpty(),
check('product', 'El product es obligatorio').not().isEmpty(),
validarCampos
], getCommonClient);

router.get('/special/product',[ //Middlewares
check('first_name', 'El first_name es obligatorio').not().isEmpty(),
check('last_name', 'El last_name es obligatorio').not().isEmpty(),
validarCampos
], getCommonProduct);

module.exports = router;