const express = require("express");
const router = express.Router();
const { login, profile, register } = require("../controllers/user");

router.post("/login", login);

router.get("/profile", profile);

router.post("/register", register);

module.exports = router;
