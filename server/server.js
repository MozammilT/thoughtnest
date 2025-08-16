import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoute from "./routes/adminRoute.js";
import blogRoute from "./routes/blogRoutes.js";
import session from "express-session";
import connectCloudinary from "./config/cloudinary.js";
import passport from "./config/passport.js";
import MongoStore from "connect-mongo";

connectDB();
connectCloudinary();

const app = express();
const port = 3000;

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://thoughtnest-blog.vercel.app",
      "https://thoughtnest-backend.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGDB_URI,
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log("Session at", req.path, ":", req.session);
  next();
});

//Routes
app.get("/", (_, res) => {
  res.send("Api is running");
});

app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
