import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { addBlog } from "../controllers/blogController.js";

const blogRoute = express();

blogRoute.post("/add", upload.single("image"), addBlog);

export default blogRoute;
