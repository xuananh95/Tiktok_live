const express = require("express");
const {
    protect,
    isAdmin,
    isActivated,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", protect, isActivated, (req, res) => {
    res.status(200).json("success!");
});

module.exports = router;
