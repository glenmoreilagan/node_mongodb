require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/db_blogs", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database."));

app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/products", require("./routes/products"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running port: ${PORT}.`));
