const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

// 1 Check if user send access token with request and whether token is valid
const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = authorization.split(" ")[1];
            const userVerify = jwt.verify(token, JWT_SECRET);
            const userInfo = await User.findById(
                mongoose.Types.ObjectId(userVerify.id)
            ).select("-password");
            console.log(userInfo);
            req.user = userInfo;
            next();
        } catch (error) {
            res.status(401);
            console.log(error);
            throw new Error("Token invalid");
        }
    } else {
        res.status(401);
        throw new Error("No JWT");
    }
});

// 2. Check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("No permission");
    }
};

// 3. Check whether if user has activated the account by registering tiktok id
const isActivated = asyncHandler(async (req, res, next) => {
    if (req.user.tiktok_id == "") {
        res.status(401);
        throw new Error("No tiktok id supplied!");
    } else {
        next();
    }
});

module.exports = {
    protect,
    isAdmin,
    isActivated,
};
