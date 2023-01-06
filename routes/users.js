const express = require("express");
const router = express.Router();
const {
    register,
    login,
    registerAdmin,
    getUserInfo,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.post("/register-admin", registerAdmin);
router.get("/", protect, getUserInfo);

module.exports = router;
