import express from "express";
import {
  adminLogin,
  adminRegister,
  getAdminData,
  getAllAdminBlogs,
  getAllComments,
  getDashboard,
  deleteComment,
  disapproveComment,
  approveComment,
} from "../controllers/adminController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const adminRoute = express.Router();

// Local Strategy for username/email and password
passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier",
      passwordField: "password",
    },
    async (identifier, password, done) => {
      try {
        const user = await User.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });
        if (!user) return done(null, false, { message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

adminRoute.post("/login", passport.authenticate("local"), (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Login successful", user: req.user });
});
adminRoute.post("/register", adminRegister);
adminRoute.get("/", getAdminData);
adminRoute.get("/blogs",isAuthenticated, getAllAdminBlogs);
adminRoute.get("/comments", getAllComments);
adminRoute.get("/dashboard", isAuthenticated, getDashboard);
adminRoute.delete("/delete-comment/:id", isAuthenticated, deleteComment);
adminRoute.post("/disapprove-comment/:id", isAuthenticated, disapproveComment);
adminRoute.post("/approve-comment/:id", isAuthenticated, approveComment);

export default adminRoute;
