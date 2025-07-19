import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Local Strategy for username/email and password
passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier",
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

//Google O'Auth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/admin/auth/google/dashboard",
    },
    async (asseccToken, refreshToken, profile, done) => {
      try {
        console.log("Google O'Auth profile: ", profile);
        try {
          const firstName = profile.name.givenName;
          const lastName = profile.name.familyName;
          const username = (
            firstName + (lastName ? lastName : "")
          ).toLowerCase();
          console.log(username, profile.emails[0].value, profile.id);

          const user = await User.findOne({
            email: profile.emails[0].value,
          });
          if (!user) {
            const newUser = await User.create({
              username,
              email: profile.emails[0].value,
              password: profile.id * process.env.SALT_ROUNDS,
              image: profile.photos[0].value,
            });
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (err) {
          console.log("Google auth error: ", err);
          return done(err);
        }
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
