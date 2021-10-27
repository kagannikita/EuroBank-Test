const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const galleryApi=require("./gallery")

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(galleryApi);


module.exports = router;
