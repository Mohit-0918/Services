const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/emailController");
const authenticate = require("../utils/authenticate");

router.post("/send", authenticate, sendEmail);

module.exports = router;