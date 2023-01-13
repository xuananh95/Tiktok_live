require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { WebcastPushConnection } = require("tiktok-live-connector");
let tiktokLiveConnection;
let msgStruc;

const connectDB = require("./config/db");

const userRouter = require("./routes/users");

// config
const PORT = 5001;
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
};

connectDB();
const app = express();
const expressWs = require("express-ws")(app);

app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors(corsOptions));

const liveRouter = express.Router();

liveRouter.ws("/", function (ws, req) {
    ws.on("connection", () => {
        console.log("connected");
    });
    ws.on("message", (data) => {
        data = JSON.parse(data);
        // console.log(data);
        if (data.type === "ROOMID") {
            if (!data.payload.roomID.includes("@")) {
                data.payload.roomID = "@" + data.payload.roomID;
            }
            msgStruc = data.payload.msgStruc;
            tiktokLiveConnection = new WebcastPushConnection(
                data.payload.roomID
            );
            tiktokLiveConnection
                .connect()
                .then((state) => {
                    ws.send(
                        JSON.stringify({
                            type: "Connect",
                            msg: "Success",
                            payload: state.roomId,
                        })
                    );
                })
                .catch((err) => {
                    ws.send(
                        JSON.stringify({
                            type: "Connect",
                            msg: "Failed",
                            payload: "Không tìm thấy người dùng",
                        })
                    );
                });
            tiktokLiveConnection.on("chat", (data) => {
                console.log(
                    `${data.uniqueId} (userId:${data.userId}) sends ${data.comment}`
                );
                let stat = null;
                if (data.comment.includes(msgStruc)) {
                    console.log("STRUCT", data.comment);
                    const strucData = data.comment.split("-");
                    strucData = strucData.shift();
                    stat = {
                        user: data.uniqueId,
                        productCode: strucData[0],
                        quantity: strucData[1],
                    };
                }
                const payload = {
                    chat: `${data.uniqueId} sends: ${data.comment}`,
                    stat: stat,
                };
                ws.send(
                    JSON.stringify({
                        type: "chat",
                        payload: payload,
                    })
                );
            });
        }
    });
    console.log("socket", req.testing);
});

app.use("/auth", userRouter);
app.use("/live", liveRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
