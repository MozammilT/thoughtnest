import User from "../models/user.js";
import Comment from "../models/comment.js";
import Blog from "../models/blog.js";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const adminLogin = async (req, res) => {
  const { identifier, password } = req.body;
  console.log("Login Attempt:", { identifier });

  if (!identifier || !password) {
    console.log("Missing credentials.");
    return res.status(400).json({
      success: false,
      message: "Username/Email and password are required.",
    });
  }
  try {
    const existingUser = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    console.log("User lookup result:", existingUser);

    if (!existingUser) {
      console.log("User not found.");
      return res
        .status(404)
        .json({ success: false, message: "User not found, Please register" });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      console.log("Incorrect password entered.");
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    }
    console.log("Session after login: ", req.session);

    console.log("Login successful for user:", existingUser.email);
    req.login(existingUser, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Login failed" });
      }
      res
        .status(200)
        .json({ success: true, message: "Login successful", existingUser });
    });
  } catch (err) {
    console.log("Error in adminLogin function :", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminRegister = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("[adminRegister] Registration Attempt:", {
    username,
    email,
    password,
  });

  if (!username || !email || !password) {
    console.log("Missing registration details.");
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    console.log("[adminRegister] User lookup by email result:", user);

    if (user) {
      console.log("[adminRegister] User already exists with email:", email);
      return res.status(409).json({
        success: false,
        message: "User already exists, try logging in",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(
      `[adminRegister] User created successfully with data: ${newUser}`
    );
    req.login(newUser, (err) => {
      if (err) throw err;
      res
        .status(200)
        .json({ success: true, message: "User created successfully." });
    });
  } catch (err) {
    console.log("Error in adminRegister function :", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAdminData = async (req, res) => {
  console.log("[getAdminData] getUserData called");
  try {
    // Check if user session exists
    if (!req.user) {
      console.log("[getAdminData] No user session found");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }

    const admin = req.user;
    console.log("[getAdminData] User session found:", admin);

    // Return the admin data
    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (err) {
    console.log("[getAdminData] Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllAdminBlogs = async (req, res) => {
  console.log("getAllAdminBlogs function called...");
  try {
    if (!req.user) {
      console.log("[getAllComments] No user session found");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }

    const author = req.user.id;
    console.log("[getAllAdminBlogs] Logged in user ID:", author);

    const blogs = await Blog.find({ author: author })
      .sort({ createdAt: -1 })
      .lean();
    console.log(`[getAllAdminBlogs] Blogs fetched for admin: ${author}`);
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.log("Error in getAllAdminBlogs function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllComments = async (req, res) => {
  console.log("getAllComments function called...");
  try {
    if (!req.user) {
      console.log("[getAllComments] No user session found");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }
    const author = req.user.id;
    console.log("[getAllComments] Logged in user ID:", author);

    // Find blogs written by this user
    const blogs = await Blog.find({ author: author }).select("_id");
    const blogIds = blogs.map((blog) => blog._id);
    console.log(`[getAllComments] Found ${blogIds.length} blogs for user`);

    //Fetch only rellevant comments
    const comments = await Comment.find({ blog: { $in: blogIds } })
      .populate("blog")
      .sort({ createdAt: -1 })
      .lean();
    console.log(`[getAllComments] Found ${comments.length} relevant comments`);

    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.log("Error in getAllComments function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDashboard = async (req, res) => {
  console.log("getDashboard function called...");
  // Check if user session exists
  if (!req.user) {
    console.log("[getDashboard] No user session found");
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Please login first",
    });
  }
  const author = req.user.id;
  console.log("[getDashboard] User found: ", author);
  try {
    const recentBlogs = await Blog.find({ author: author })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const blogs = await Blog.find({ author: author }).countDocuments();
    const blogsByAdmin = await Blog.find({ author: author }).select("_id");
    const blogIds = blogsByAdmin.map((blog) => blog.id);
    const comments = await Comment.find({
      blog: { $in: blogIds },
    }).countDocuments();
    const drafts = await Blog.find({
      author: author,
      isPublished: false,
    })
      .countDocuments()
      .lean();

    console.log("[getDashboard] Dashboard Data Summary:", {
      recentBlogs: recentBlogs.length,
      totalBlogs: blogs,
      totalComments: comments,
      totalDrafts: drafts.length,
    });
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };
    res.status(200).json({ success: true, dashboardData });
  } catch (err) {
    console.log("Error in getDashboard function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  console.log("deleteComment function called...");
  try {
    const { id } = req.params;
    console.log(`[deleteComment] Request to delete comment with ID: ${id}`);

    if (!id) {
      console.log("[deleteComment] No comment ID provided in request");
      return res.status(400).json({
        success: false,
        message: "Comment ID is required",
      });
    }

    const deleteComment = await Comment.findByIdAndDelete(id);
    console.log("[deleteComment] Comment deleted successfully:", deleteComment);
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    console.log("Error in deleteComment function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const disapproveComment = async (req, res) => {
  console.log("disapproveComment function called...");
  const { id } = req.params;
  console.log(`[disapproveComment] Request to approve comment with ID: ${id}`);
  if (!id) {
    console.log("[disapproveComment] No comment ID provided in request");
    return res.status(400).json({
      success: false,
      message: "Comment ID is required",
    });
  }
  try {
    const approvedComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: false },
      { new: false }
    );
    console.log(
      "[disapproveComment] Comment approved successfully:",
      approvedComment
    );
    res.status(200).json({ success: true, message: "Comment disapproved" });
  } catch (err) {
    console.log("Error in disapproveComment function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const approveComment = async (req, res) => {
  console.log("approveComment function called...");
  const { id } = req.params;
  console.log(`[approveComment] Request to approve comment with ID: ${id}`);
  if (!id) {
    console.log("[approveComment] No comment ID provided in request");
    return res.status(400).json({
      success: false,
      message: "Comment ID is required",
    });
  }
  try {
    const approveComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
    console.log(
      "[disapproveComment] Comment approved successfully:",
      approveComment
    );
    res.status(200).json({ success: true, message: "Comment approved" });
  } catch (err) {
    console.log("Error in approveComment function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const adminLogout = async (req, res, next) => {
  console.log("adminLogout function called...");
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res
        .status(200)
        .json({ success: true, messge: "User logged out successfully" });
    });
  } catch (err) {
    console.log("Error in adminLogout function: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
