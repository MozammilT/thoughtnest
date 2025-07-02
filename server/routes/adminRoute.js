import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";

const adminRoute = express.Router();
adminRoute.post("/login", adminLogin);
adminRoute.post("/register", adminRegister);

export default adminRoute;
