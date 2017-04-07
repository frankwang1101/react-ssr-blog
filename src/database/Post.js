import {PostModel,CommentModel} from './db'

module.exports = {
    create : (post) => {
        return PostModel(post).save();
    },
    findPost : (author) => {
        let query = {};
        if(author){
            query.author = author;
        }
        return PostModel
            .find(query)
            .populate({path:'author',Model:'User'})
            .exec();
    },
    findById : (id) => {
        return PostModel
            .findOne({_id:id})
            .populate({path:'author',Model:'User'})
            .exec();
    },
    delById : id => {
        return PostModel
            .remove({_id:id})
            .exec()
            .then(res => {
                if(res.result.ok && res.result.n > 0){
                    return CommentModel.delCommentByPostId(postId);
                }
            })
    },
    update: data => {
        return UserModel
            .update({_id:id},{$set:data})
            .exec();
    }
}