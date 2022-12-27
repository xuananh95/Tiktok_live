const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    tiktok_id: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    // Mã hóa password trước khi lưu user vào database
    //check xem password có đc sửa hay không ?
    // Nếu không sửa gì -> next
    if (!this.isModified("password")) return next();

    // Nếu sửa - thì mã hóa
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
