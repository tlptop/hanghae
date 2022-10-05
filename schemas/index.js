// 요거는 그냥 연결시켜주는 거. 딱히 건드릴 거 없는 거 같은데?
// 스키마를 사용할 수 있는 것은 몽구스 때문임.
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1/prac") 
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect; // 위에서 만든 connect를 app.js로 보내주기위해