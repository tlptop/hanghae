const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema); // 왜 계속 s를 빼먹고, Comment라고 적냐... 이건 상관없는 듯?