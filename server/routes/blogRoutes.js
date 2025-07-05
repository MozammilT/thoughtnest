import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  addBlog,
  getAllBlog,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
} from "../controllers/blogController.js";

const blogRoute = express.Router();

blogRoute.post("/add", upload.single("image"), addBlog);
blogRoute.get("/all", getAllBlog);
blogRoute.delete("/delete/:id", deleteBlogById);
blogRoute.post("/toggle-publish", togglePublish);
blogRoute.get("/:id", getBlogById);
blogRoute.post("/add-comments", addComment);
blogRoute.post("/comments", getBlogComments);

export default blogRoute;
