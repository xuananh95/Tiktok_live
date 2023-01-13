const { WebcastPushConnection } = require("tiktok-live-connector");

let tiktokUsername = "";

let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection
    .connect()
    .then((state) => {
        console.log(`Connected to roomID ${state.roomId}`);
    })
    .catch((err) => {
        console.log("Failed to connect", err);
    });

// listen to chat message
tiktokLiveConnection.on("chat", (data) => {
    if (data.comment.includes())
        console.log(
            `${data.uniqueId} (userId: ${data.userId}) writes: ${data.comment}`
        );
});

tiktokLiveConnection.on("gift", (data) => {
    console.log(
        `${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`
    );
});

export default tiktokLiveConnection;
