const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateJWT");
const cookie = require("cookie");

const registerAdmin = asyncHandler(async (req, res) => {
    const isAdminExisted = await User.count({});
    if (isAdminExisted === 0) {
        const { username, password } = req.body;
        const newAdminUser = await User.create({
            username,
            password,
            isAdmin: true,
        });
        if (newAdminUser) {
            res.status(200).json({
                msg: "Success",
            });
        } else {
            res.status(400);
            throw new Error("Unexpected Error!");
        }
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});

const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if username exists in DB
    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Save user in database
    const newUser = await User.create({
        username,
        password,
    });
    if (newUser) {
        res.status(200).json({
            msg: "Success",
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Missing required field(s)!");
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const payload = {
            id: user._id,
            username: user.username,
            displayName: user.displayName,
            isAdmin: user.isAdmin,
        };
        const token = generateToken(payload);
        const serialized = cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        });
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                displayName: user.displayName,
                // isAdmin: user.isAdmin,
                token: token,
            },
        });
    } else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

const checkCookie = (req, res) => {
    console.log(req.cookie);
};

module.exports = { register, login, registerAdmin, checkCookie };
