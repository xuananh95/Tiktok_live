const express = require("express");
const router = express.Router();
const {
    register,
    login,
    registerAdmin,
    getUserInfo,
    createAccount,
    changePassword,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.post("/register-admin", registerAdmin);
router.get("/", protect, getUserInfo);
router.post("/create-account", createAccount);
router.post("/change-password", changePassword);

module.exports = router;
