const express = require("express");
const router = express.Router();
const {
    register,
    login,
    registerAdmin,
    checkCookie,
} = require("../controllers/userController");

router.post("/", register);
router.post("/login", login);
router.post("/register-admin", registerAdmin);
router.get("/", checkCookie);

module.exports = router;
