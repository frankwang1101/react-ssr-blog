import parser from 'body-parser'
import User from '../database/User'
import Post from '../database/Post'
import Comment from '../database/Comment'
import * as JwtUtil from '../utils/jwtUtil'
import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname)
  }
})
const upload = multer({storage});

var par = parser.text();
module.exports = (app) => {
    app.post('/upload/avatar',upload.single('avatar'),(req,res,next) => {
        res.send(req.file)
    })
    app.post('/signup',par,(req,res) => {
        let param = JSON.parse(req.body);
        User.create(param).then(result => {
            res.send({msg:'create User success!',success:true})
        })
    })
    app.post('/post',par,(req,res) => {
        let param = JSON.parse(req.body);
        let token = req.headers['authrorization'];
        try{
            JwtUtil.serverJwtValid(token,(info) => {
                if(info && typeof info === 'object'){
                    token = JwtUtil.updateToken(info,token);
                    Post.create(param).then(result => {
                        res.send({success:true,msg:'发表成功',token:token});
                    }).fail(err => res.send({success:false,msg:err}))
                }else if(typeof info === 'string'){
                    res.send({success:false,msg:info});
                }
            })
        }catch(e){
            console.log(e)
        }
    })
    app.get('/postlist/:id?',(req,res) => {
        const authorId = req.params.id;
        Post.findPost(authorId).then(arr => {
            res.send({list:arr,success:true});
        })
    })
    app.get('/post/:id',(req,res) => {
        const postId = req.params.id;
        Promise.all([
            Post.findById(postId),
            Comment.getCommentsByPostId(postId)
        ]).then(result => {
            const post = result[0];
            const comments = result[1];
            res.send({post:post.toObject(),comments:comments});
        })
    })
    app.delete('/post/:id',(req,res) => {
        const postId = req.params.id;
        let token = req.headers['authrorization'];
        try{
            JwtUtil.serverJwtValid(token,(info) => {
                if(info && typeof info === 'object'){
                    token = JwtUtil.updateToken(info,token);
                    Post.delById(postId).then(result => {
                        res.send({success:true,msg:'删除成功',token:token});
                    }).fail(err => res.send({success:false,msg:err}))
                }else if(typeof info === 'string'){
                    res.send({success:false,msg:info});
                }
            })
        }catch(e){
            console.log(e)
        }
       
    })
    app.put('/post/',par,(req,res) => {
        const data = JSON.parse(req.body);
        let token = req.headers['authrorization'];
        try{
            JwtUtil.serverJwtValid(token,(info) => {
                if(info && typeof info === 'object'){
                    token = JwtUtil.updateToken(info,token);
                    Post.update(data).then(result => {
                        res.send({success:true,msg:'删除成功',token:token});
                    }).fail(err => res.send({success:false,msg:err}))
                }else if(typeof info === 'string'){
                    res.send({success:false,msg:info});
                }
            })
        }catch(e){
            console.log(e)
        }
    })
    app.delete('/comment/',par,(req,res) => {
        const data = JSON.parse(req.body);
        let token = req.headers['authrorization'];
        try{
            JwtUtil.serverJwtValid(token,(info) => {
                if(info && typeof info === 'object'){
                    if(info._id === data.author){
                        token = JwtUtil.updateToken(info,token);
                        Comment.delById(commentId).then(result => {
                            res.send({success:true,msg:'删除成功',token:token});
                        }).fail(err => res.send({success:false,msg:err}))
                    }else{
                        res.send({success:false,msg:'登录验证失败，请重新登录!'});    
                    }
                }else if(typeof info === 'string'){
                    res.send({success:false,msg:info});
                }
            })
        }catch(e){
            console.log(e)
        }
    })
    app.put('/comment/',par,(req,res) => {
        const data = JSON.parse(req.body);
        Comment.update(data).then(result => {
            res.send({success:true,msg:'更新成功'});
        })
    })
    app.post('/comment/',par,(req,res) => {
        const data = JSON.parse(req.body);
        let token = req.headers['authrorization'];
        try{
            JwtUtil.serverJwtValid(token,(info) => {
                if(info && typeof info === 'object'){
                    token = JwtUtil.updateToken(info,token);
                    Comment.create(data).then(result => {
                        res.send({msg:'评论成功',success:true,token:token});
                    }).fail(err => res.send({success:false,msg:err}))
                }else if(typeof info === 'string'){
                    res.send({success:false,msg:info});
                }
            })
        }catch(e){
            console.log(e)
        }
    })
    app.post('/login',par,(req,res) => {
        const info = JSON.parse(req.body);
        User.check(info).then(result => {
           try{
                if(result){
                const info = result.toObject();
                delete info.password;
                const token = JwtUtil.addToken(info,req);
                info.token = token;
                res.send({success:true,info:info});
            }else{
                res.send({success:false,msg:"wrong username or password!"});    
            }
           }catch(err){
               console.log(err)
           }
        }).catch(err => {
            res.send({success:false,msg:err});
        })
    })
    app.get('/checkjwt',(req,res) => {
        let token = req.headers['authrorization'];
        try{
            JwtUtil.serverJwtValid(token,(info) => {
                if(info && typeof info === 'object' && !(info instanceof Error)){
                    token = JwtUtil.updateToken(info,token);
                    res.send({success:true,info:info,token:token});
                }else if(info instanceof Error){
                    res.send({success:false,msg:''});
                }
            })
        }catch(e){
            console.log(e)
        }
    })
    
}