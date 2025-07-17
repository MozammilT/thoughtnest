import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addBlog,
  getAllBlog,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
  generateContent,
} from "../controllers/blogController.js";

const blogRoute = express.Router();

blogRoute.post("/add", upload.single("image"), addBlog);
blogRoute.get("/all", getAllBlog);
blogRoute.delete("/delete/:id",isAuthenticated, deleteBlogById);
blogRoute.post("/toggle-publish",isAuthenticated, togglePublish);
blogRoute.get("/:id", getBlogById);
blogRoute.post("/add-comments", addComment);
blogRoute.post("/comments", getBlogComments);
blogRoute.post("/generate", generateContent);

export default blogRoute;
