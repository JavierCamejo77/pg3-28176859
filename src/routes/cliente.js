const router = require('express').Router();

const { getRegister, postRegister, getLogin, postLogin } = require('../controllers/clienteController');

router.get("/registro", getRegister);

router.post("/registro", postRegister);

router.get("/login", getLogin);

router.post("/login", postLogin);

module.exports = router;