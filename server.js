require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const userRouter = require("./routes/users");
const homeRouter = require("./routes/home");

const { errorHandle } = require("./middlewares/errorMiddleware");

// config
const PORT = 5001;
const corsOptions = {
    origin: "http://localhost:3000",
};

connectDB();
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", userRouter);

app.use("/home", homeRouter);

app.use(errorHandle);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
