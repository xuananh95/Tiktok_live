const express = require("express");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", protect, isAdmin, (req, res) => {
    res.status(200).json("success!");
});

module.exports = router;
