const express = require("express");
const app = express();
const port = 3000;
const Router1 = require("./routes/posts"); // posts.js에서 보냈다면 받아야지
const Router2 = require("./routes/comments");
const connect = require("./schemas"); // index라는 이름은 자동으로 잡아준다.
connect();

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/views/board.html'); 
// });
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

app.use(express.urlencoded({ extended: true })); // 이건뭐지? 구글링 고고.
app.use(express.json()); // app.use는 전역 미들웨어이다. 위치가 중요하다.
app.use("/api", [Router1]);
app.use("/api2", [Router2]);