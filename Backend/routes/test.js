const { Router } = require('express');

const { query } = require('../controllers/test');

const router = Router();

router.post('/', query);

module.exports = router;