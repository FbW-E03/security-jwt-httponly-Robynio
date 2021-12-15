const express = require("express");
const router = express.Router();
const { login, profile, register } = require("../controllers/user");
const passport = require("passport");

router.post("/register", register);

router.post("/login", login);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/profile", profile);

module.exports = router;
