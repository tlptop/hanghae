// 일종의 틀만 잡아주는 건가??? (모델링)

const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", postsSchema); // 여기서 보내주는 것. "Posts" 알파벳은 상징적인 것. 아무렇게나 써도 기능적으로 이상X.