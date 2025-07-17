import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import { v2 as cloudinary } from "cloudinary";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    console.log("[addBlog] Incoming request");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.user:", req.user);

    // Parse blog data
    const { title, description, category, image, isPublished, subTitle } =
      req.body;

    console.log("Parsed blog data:", {
      title,
      description,
      category,
      image,
      isPublished,
      subTitle,
    });

    // Basic validation
    if (!title || !description || !category) {
      console.log("[addBlog] Missing required fields");
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if image file exists
    if (!req.file) {
      console.log("[addBlog] No image file received");
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    // Upload image to Cloudinary
    console.log("[addBlog] Uploading image to Cloudinary...");
    const response = await cloudinary.uploader.upload(req.file.path);
    console.log("[addBlog] Image uploaded successfully:", response.secure_url);

    const imageURL = response.secure_url;

    // Add blog to DB
    console.log("[addBlog] Saving blog to database...");
    const newBlog = await Blog.create({
      title,
      description,
      category,
      image: imageURL,
      isPublished,
      subTitle,
      author: req.user.id,
    });

    console.log("[addBlog] Blog created successfully:", newBlog);

    res
      .status(200)
      .json({ success: true, message: "Blog uploaded successfully" });
  } catch (err) {
    console.error("[addBlog] Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllBlog = async (req, res) => {
  console.log("getAllBlog function called...");
  try {
    const blogData = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, blogData });
  } catch (err) {
    console.log("Error in getAllBlog function: ", err);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
};

export const getBlogById = async (req, res) => {
  console.log("getBlogById function called...");
  try {
    const { id } = req.params;
    const blogData = await Blog.findById(id).populate("author");
    if (!blogData) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blogData });
  } catch (err) {
    console.log("Error in getBlogById function: ", err);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
};

export const deleteBlogById = async (req, res) => {
  console.log("deleteBlogById function called...");
  try {
    const { id } = req.params;
    console.log(`[deleteBlogById] Request to delete blog with ID: ${id}`);
    const blogData = await Blog.findByIdAndDelete(id);
    if (!blogData) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    //Delete all comments associated with this blog
    const commentData = await Comment.deleteMany({ blog: id });
    console.log(
      `[deleteBlogById] Associated comments deleted. Count: ${commentData.deletedCount}`
    );

    res.status(200).json({
      success: true,
      message: "Blog and its comments deleted successfully",
    });
  } catch (err) {
    console.log("Error in deleteBlogById function: ", err);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
};

export const togglePublish = async (req, res) => {
  console.log("togglePublish function called...");
  try {
    const { id } = req.body;
    const blogData = await Blog.findById(id);
    if (!blogData) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    console.log("[togglePublish] Blog found:", blogData);
    blogData.isPublished = !blogData.isPublished;
    await blogData.save();
    console.log(
      "[togglePublish] Blog status updated. New value: ",
      blogData.isPublished
    );
    res.status(200).json({ success: true, message: "Blog status updated" });
  } catch (err) {
    console.log("Error in togglePublish function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addComment = async (req, res) => {
  console.log("addComment function called...");
  try {
    const { blog, name, content } = req.body;
    const user = req.session?.user?.id || null;
    const commentData = await Comment.create({
      user,
      blog,
      name,
      content,
    });
    console.log("[addComment] Comment created: ", commentData);
    res
      .status(200)
      .json({ success: true, message: "Coment created successfully" });
  } catch (err) {
    console.log("Error in addComment function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getBlogComments = async (req, res) => {
  console.log("getBlogComments function called...");
  try {
    const { id } = req.body;
    const blogComment = await Comment.find({ blog: id, isApproved: true }).sort(
      { createdAt: -1 }
    );
    console.log(
      `[getBlogComments] Comments for blog - ${id} fetched: ${blogComment}`
    );
    res.status(200).json({ success: true, blogComment });
  } catch (err) {
    console.log("Error in getBlogComments function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const generateContent = async (req, res) => {
  console.log("generateContent function called...");
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt +
        "Generate a blog content for this topic in simple text format and don't reply with Here's a blog post about 'the title I've given' in a simple text format:"
    );
    res.status(200).json({ success: true, content });
  } catch (err) {
    console.log("Error in generateContent function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
