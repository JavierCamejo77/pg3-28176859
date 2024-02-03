const { getRegister, postRegister } = require("./cliente/register");
const { getLogin, postLogin } = require("./cliente/login");
const { resetPost, resetGet } = require("./cliente/reset");
const { newPassGet, newPassPost } = require("./cliente/newPass");
module.exports = { resetPost, resetGet, getRegister, postRegister, getLogin, postLogin, newPassGet, newPassPost };