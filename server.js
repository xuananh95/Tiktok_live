require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const userRouter = require("./routes/users");
const homeRouter = require("./routes/home");

const { errorHandle } = require("./middlewares/errorMiddleware");

const PORT = 5001;
connectDB();
const app = express();

app.use(express.json());
app.use("/auth", userRouter);

app.use("/home", homeRouter);

app.use(errorHandle);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
