const { Router } = require('express');

const { query } = require('../controllers/test');

const router = Router();

router.get('/', query);

module.exports = router;