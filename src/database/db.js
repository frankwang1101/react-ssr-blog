const mongoose = require('mongoose');
import moment from 'moment'
import objectIdToTimestamp from 'objectid-to-timestamp'
 var db = mongoose.createConnection('127.0.0.1','ssrblog','27017');
 db.on('error', console.error.bind(console, 'connection error:'))
const createAt = (schema,object) => {
    schema.add({create_at:String});
    schema.post('init',(doc) => {
        doc.create_at = moment(objectIdToTimestamp(doc._id)).format('YYYY-MM-DD HH:mm');
        // console.log(doc)
    })
}
const User = mongoose.Schema({
    nickname:String,
    username:String,
    password:String,
    gender:String,
    avatar:String
})
User.plugin(createAt);
User.index({username:1,unique:true});

exports.UserModel = db.model('User',User);


const Post = new mongoose.Schema({
    title:String,
    content:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})
Post.plugin(createAt,{index:true});
Post.index({author:1,_id:-1});

exports.PostModel = db.model('Post',Post);

const Comment = new mongoose.Schema({
    content:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'}
})

Comment.plugin(createAt);
Comment.index({_id:-1});

exports.CommentModel = db.model('Comment',Comment);