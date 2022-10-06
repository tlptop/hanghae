const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment")


router.post("/:postId", async (req,res) => { // 7.작성
    const {postId} = req.params;
    const { user, password, content} = req.body;
    if (content === ""){
        res.json({"message":"댓글 내용을 입력해주세요"});
    } else {
        const createComment = await Comments.create({ postId ,user, password, content }) // 조심!!!
        res.json({"message":"댓글이 생성되었습니다."});
    }
});


router.get("/:postId", async (req, res) => { // 6.특정 게시글의 댓글 목록 조회
    const {postId} = req.params; //특정 게시물을 가진 postId 를 넘겨주기 위해서 생성.
    const commentList = await Comments.find({postId}).sort("-createdAt"); // find({postId}) => 게시글이 갖고있는 postId
    const comt = commentList.map((comt)=>{ // 앞의 comt와 뒤의comt(그저변수=구멍임)는 서로 다르지만, 같게 써도 문제없다.
        commentId = comt._id,
        user = comt.user,
        content = comt.content,
        createdAt = comt.createdAt
        return {"commentId":commentId, "user":user, "content":content, "createdAt":createdAt}
    })
    res.json({ commentListUp : comt});
});


router.put("/:commentId", async (req,res) => { // 8. 댓글 수정
    const {commentId} = req.params; 
    const commtpass = await Comments.findOne({_id:commentId})
    const {password, content} = req.body; 
    if (content === ""){
        res.send({result:"댓글을 입력해주세요"})
    } else if (password === commtpass.password){
        await Comments.updateOne({_id:commentId},{$set: {content}})
        res.send({result: "댓글을 수정하였습니다."})
    } else {
        res.send({result:"다시 시도해주세요."})
    }
});

router.delete("/:commentId", async (req, res) => { 
    const {commentId} = req.params;  //commentId를 파람스로 갖고와서
    const commtpass = await Comments.findOne({_id:commentId})  //받아온 commentId는 _id다. 특정한 _id값을 받아온거고 넣어준것.
    const {password} = req.body
    if (password === commtpass.password){ 
        await Comments.deleteOne({_id:commentId}); // _id가 commentId 인걸 찾아서 지워준다.
        res.send({result: "댓글을 삭제하였습니다."}); 
    } else {
        res.send({result:"다시 시도해주세요."}); 
    }
});


module.exports = router;