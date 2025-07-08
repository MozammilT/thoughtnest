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

const adminRoute = express.Router();
adminRoute.post("/login", adminLogin);
adminRoute.post("/register", adminRegister);
adminRoute.get("/", getAdminData);
adminRoute.get("/blogs", getAllAdminBlogs);
adminRoute.get("/comments", getAllComments);
adminRoute.get("/dashboard", getDashboard);
adminRoute.delete("/delete-comment/:id", deleteComment);
adminRoute.post("/disapprove-comment/:id", disapproveComment);
adminRoute.post("/approve-comment/:id", approveComment);

export default adminRoute;
