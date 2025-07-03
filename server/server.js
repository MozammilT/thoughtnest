import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoute from "./routes/adminRoute.js";
import blogRoute from "./routes/blogRoutes.js";
import session from "express-session";
import connectCloudinary from "./config/cloudinary.js";

connectDB();
connectCloudinary();

const app = express();
const port = 3000;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//Routes
app.get("/", (_, res) => {
  res.send("Api is running");
});

app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
