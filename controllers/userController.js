const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateJWT");

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
        res.json({
            _id: user._id,
            username: user.username,
            displayName: user.displayName,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

module.exports = { register, login };
