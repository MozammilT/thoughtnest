import Blog from "../models/blog.js";
import { v2 as cloudinary } from "cloudinary";

export const addBlog = async (req, res) => {
  try {
    console.log("[addBlog] Incoming request");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.session.user:", req.session.user);

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
      author: req.session.user.id,
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
