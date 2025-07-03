import express from "express";
import {
  adminLogin,
  adminRegister,
  getAdminData,
} from "../controllers/adminController.js";

const adminRoute = express.Router();
adminRoute.post("/login", adminLogin);
adminRoute.post("/register", adminRegister);
adminRoute.get("/", getAdminData);

export default adminRoute;
