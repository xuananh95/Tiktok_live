const asyncHandler = require("express-async-handler");

const connect = asyncHandler(async (req, res) => {
    let tiktokUsername = req.body.tiktokUsername;

    // Create a new wrapper object and pass the username
    let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

    // Connect to the chat (await can be used as well)
    const connection = tiktokLiveConnection.connect();
    tiktokLiveConnection
        .connect()
        .then((state) => {
            res.status(200).json({
                msg: "Success",
                data: state,
            });
        })
        .catch((err) => {
            res.status(401).json({
                msg: "User offline",
            });
        });
});

module.exports = { connect };
