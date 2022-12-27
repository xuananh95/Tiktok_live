const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_IN,
    });
};

module.exports = generateToken;
