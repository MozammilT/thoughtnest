import express from "express";
import {
  adminLogin,
  adminRegister,
  getAdminData,
  getAllAdminBlogs,
  getAllComments,
  getDashboard,
  deleteComment,
  approveComment,
} from "../controllers/adminController.js";

const adminRoute = express.Router();
adminRoute.post("/login", adminLogin);
adminRoute.post("/register", adminRegister);
adminRoute.get("/", getAdminData);
adminRoute.get("/blogs", getAllAdminBlogs);
adminRoute.get("/comments", getAllComments);
adminRoute.get("/dashboard", getDashboard);
adminRoute.delete("/delete-comment/:id", deleteComment);
adminRoute.delete("/approve-comment", approveComment);

export default adminRoute;
