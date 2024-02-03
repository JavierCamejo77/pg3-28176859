const router = require('express').Router();

const { getRegister, postRegister, getLogin, postLogin, resetPost, resetGet, newPassGet, newPassPost } = require('../controllers/clienteController');

router.get("/registro", getRegister);

router.post("/registro", postRegister);

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/reset", resetGet);

router.post('/reset', resetPost);

router.get('/reset/:token', newPassGet)

router.post('/reset/:token', newPassPost)

module.exports = router;