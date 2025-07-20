import express from "express";
import {
  adminRegister,
  getAdminData,
  getAllAdminBlogs,
  getAllComments,
  getDashboard,
  deleteComment,
  disapproveComment,
  approveComment,
  adminLogout,
} from "../controllers/adminController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import passport from "../config/passport.js";

const adminRoute = express.Router();

adminRoute.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ success: true, message: "Login successful", user });
    });
  })(req, res, next);
});
adminRoute.post("/register", adminRegister);
adminRoute.get("/", getAdminData);
adminRoute.get("/blogs", isAuthenticated, getAllAdminBlogs);
adminRoute.get("/comments", getAllComments);
adminRoute.get("/dashboard", isAuthenticated, getDashboard);
adminRoute.delete("/delete-comment/:id", isAuthenticated, deleteComment);
adminRoute.post("/disapprove-comment/:id", isAuthenticated, disapproveComment);
adminRoute.post("/approve-comment/:id", isAuthenticated, approveComment);
adminRoute.get("/logout", isAuthenticated, adminLogout);
adminRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
adminRoute.get(
  "/auth/google/dashboard",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/auth/callback");
    console.log("Logged in via Google successfully");
  }
);

export default adminRoute;
