import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoute from "./routes/adminRoute.js";
import blogRoute from "./routes/blogRoutes.js";
import session from "express-session";
import connectCloudinary from "./config/cloudinary.js";
import passport from "./config/passport.js";

connectDB();
connectCloudinary();

const app = express();
const port = 3000;
const isProduction = process.env.NODE_ENV === "production";

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://thoughtnest-backend.vercel.app",
      "https://thoughtnest-blog.vercel.app",
    ],
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
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log("Session at", req.path, ":", req.session);
//   next();
// });

//Routes
app.get("/", (_, res) => {
  res.send("Api is running");
});

app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
