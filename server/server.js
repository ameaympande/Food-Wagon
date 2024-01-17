require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const auth = require("./auth/authHelper");

const PORT = process.env.PORT;

connectDB();

app.use(logger);

app.use(cors(corsOption));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", auth.login);
app.use("/users", require("./routes/userRoutes"));
app.use("/restaurant", require("./routes/restaurantRoutes"));
app.use("/menuitem", require("./routes/menuItemRoutes"));
// app.use("/order", require("./routes/orderRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
