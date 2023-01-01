const express = require("express");
const router = express.Router();
const {
    register,
    login,
    registerAdmin,
} = require("../controllers/userController");

router.post("/", register);
router.post("/login", login);
router.post("/register-admin", registerAdmin);

module.exports = router;
