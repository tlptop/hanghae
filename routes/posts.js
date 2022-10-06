const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post"); // 스키마에서 받음

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/views/posts.html');  // localhost:3000/api
// });

router.post("/", async (req, res) => {   // 2.게시글 작성 (post)
  const { user, password, title, content } = req.body; // user, password, title, content 는 body로 요청으로 넘어온것.
  const createdposts = await Posts.create({ // 입력한 user, password, title, content가 몽고DB에 저장되는것.
    user,
    password,
    title,
    content,
  }); 
  res.json({ message: "게시글을 생성하였습니다." });
});

router.get("/", async (req, res) => {   // 1.전체 회원 조회(get)
  const borderList = await Posts.find({}).sort("-createdAt"); // 모두 찾아서 (시간별) 내림차순
  const post = borderList.map((post) => {
      (title = post.title),
      (user = post.user),
      (createdAt = post.createdAt),
      (postId = post._id);
    return {title: title, user: user, createdAt: createdAt, postId: postId};
  });
  res.json({ borderListUp: post });
});

router.get("/:postId", async (req, res) => {   // 3. 게시글 조회(get)
  const { postId } = req.params; // 받는게 바로 윗줄에 있는 postID인거 같은데??????? 아닌가???
  const border = await Posts.findOne({ _id: postId }); // border는 객체
  const { user, title, content, createdAt } = border; // border안에는 모든 정보가 있기에, password제외 필요한 것만 다시, 객체 구조분해 할당.
  const post = {    //  (findOne이 뱉은 것은 단순 배열이 아니라 객체. 그래서 map을 못씀, post 로 담아준것)
    postId,
    user,
    title,
    content,
    createdAt,
  };
  res.json({ detail: post });
});

router.put("/:postId", async (req, res) => {  // 4. 게시글 수정
  const { postId } = req.params;
  const userpass = await Posts.findOne({ _id: postId }); // 여기서부터 (기존에 등록된 전체 doc을 변수로 잡아준것.)
  const { password, title, content } = req.body; // 바디형식으로 보내주는것. password 값은 일치하는지 봐야해서, title, content 는 바꿔줘야 하니까 보내준다.
  if (password === userpass.password) {    // 내가입력한 비밀번호가 기존 doc의 패스워드가 일치하면
    await Posts.updateOne({ _id: postId }, { $set: { title, content } }); // 그 postId 의 Set안에 들어간 것들을 업데이트해주는것.
    res.send({ result: "success!" });
  } else {
    res.send({ result: "Failure!" });
  }
});

router.delete("/:postId", async (req, res) => { // 5. 게시글 삭제
    const {postId} = req.params; 
    const userpass = await Posts.findOne({_id:postId})
    const {password} = req.body // 바디형식으로 보내주는것. 비밀번호만 필요하니까 비밀번호만 보내준다.
    if (password === userpass.password){ // 입력한 비밀번호가 doc의 패스워드와 일치하면
        await Posts.deleteOne({_id:postId}); 
        res.send({result: "success!"});
    } else {
        res.send({result: "Failure!"});
    }
    });

module.exports = router; // 당연히 app.js랑 연결시켜야지 (app.js로 보내줌)