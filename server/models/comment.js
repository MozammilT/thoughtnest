import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;
