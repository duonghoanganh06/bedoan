require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

const CONNECTION = 'mongodb+srv://admin:12345@cluster0.dujfj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors({
  origin: "*"
}))

const studentsRouter = require("./routes/students");
app.use("/students", studentsRouter);

app.listen(3000, () => console.log("Server Started"));
