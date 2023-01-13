const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateJWT");
const cookie = require("cookie");

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;

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
            res.status(400).json({
                msg: "Unexpected Error!",
            });
        }
    } else {
        res.status(400).json({
            msg: "Invalid request",
        });
    }
});

const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if username exists in DB
    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
        res.status(400).json({
            msg: "User already exists",
        });
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
        res.status(400).json({
            msg: "Invalid data",
        });
    }
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            msg: "Missing required field(s)!",
        });
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
        // const serialized = cookie.serialize("token", token, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 24 * 30,
        // });
        // res.setHeader("Set-Cookie", serialized);
        res.status(200).json({
            msg: "Success",
            data: {
                _id: user._id,
                username: user.username,
                displayName: user.displayName,
                isAdmin: user.isAdmin,
                token: token,
            },
        });
    } else {
        res.status(401).json({
            msg: "Invalid username or password",
        });
    }
});

const getUserInfo = (req, res) => {
    res.status(200).json({
        msg: "Success",
        data: req.user,
    });
};

const createAccount = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
        res.status(401).json({
            msg: "Username already exists!",
        });
    } else {
        try {
            const newUser = await User.create({
                username,
                password: DEFAULT_PASSWORD,
                isAdmin: false,
            });
            if (newUser) {
                res.status(200).json({
                    msg: "Success",
                });
            } else {
                res.status(400).json({
                    msg: "Unexpected Error!",
                });
            }
        } catch (error) {
            res.status(400).json({
                msg: "Invalid request",
            });
        }
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ username });
    console.log(1);
    if (user) {
        try {
            const isPasswordCorrect = bcrypt.compareSync(
                oldPassword,
                user.password
            );
            console.log(2);
            if (!isPasswordCorrect) {
                console.log(4);
                res.status(401).json({
                    msg: "Incorrect password!",
                });
            } else {
                user.password = newPassword;
                const updatedUser = await user.save();
                console.log(3);
                if (updatedUser) {
                    res.status(200).json({
                        msg: "Success",
                    });
                }
            }
        } catch (error) {}
    } else {
        res.status(406).json({
            msg: "Username does not exist!",
        });
    }
});

module.exports = {
    register,
    login,
    registerAdmin,
    getUserInfo,
    createAccount,
    changePassword,
};
