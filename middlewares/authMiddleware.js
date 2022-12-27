const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

// 1 Check if user send access token with request and whether token is valid
const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = authorization.split(" ")[1];
            const userVerify = jwt.verify(token, JWT_SECRET);
            const userInfo = await User.findById(userVerify.id).select(
                "-password"
            );
            console.log(userInfo);
            req.user = userInfo;
            next();
        } catch (error) {
            res.status(401);
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

module.exports = {
    protect,
    isAdmin,
};
