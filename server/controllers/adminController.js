import User from "../models/user.js";

export const adminLogin = async (req, res) => {
  const { identifier, password } = req.body;
  console.log("Login Attempt:", { identifier, password });

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

    if (existingUser.password !== password) {
      console.log("Incorrect password entered.");
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    console.log("Login successful for user:", existingUser.email);
    res
      .status(200)
      .json({ success: true, message: "Login successfull", existingUser });
  } catch (err) {
    console.log("Error in adminLogin function :", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminRegister = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registration Attempt:", { username, email, password });

  if (!username || !email || !password) {
    console.log("Missing registration details.");
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    console.log("User lookup by email result:", user);

    if (user) {
      console.log("User already exists with email:", email);
      return res.status(409).json({
        success: false,
        message: "User already exists, try logging in",
      });
    }

    const newUser = await User.create({ username, email, password });
    console.log(`User created successfully with data: ${newUser}`);
    res
      .status(200)
      .json({ success: true, message: "User created successfully." });
  } catch (err) {
    console.log("Error in adminRegister function :", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
