const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/emailController");
const authenticate = require("../utils/authenticate");

router.post("/send", sendEmail);

module.exports = router;