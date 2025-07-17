import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Local Strategy for username/email and password
passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier", // matches your frontend field
      passwordField: "password",
    },
    async (identifier, password, done) => {
      try {
        // Find user by username or email
        const user = await User.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });
        if (!user) return done(null, false, { message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
