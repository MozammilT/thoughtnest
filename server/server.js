import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

connectDB();

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (_, res) => {
  res.send("Api is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
