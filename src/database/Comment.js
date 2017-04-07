import {CommentModel} from './db'

module.exports = {
    create: data => {
        return CommentModel(data).save();
    },
    getCommentsByPostId: id => {
        return CommentModel
            .find({post:id})
            .populate({path:'author',Model:'User'})
            .exec();
    },
    delById : id => {
        return CommentModel
            .remove({_id:id})
            .exec();
    },
    delByPostId : id => {
        return CommentModel
            .remove({post:id})
            .exec();
    },
    update: data => {
        return CommentModel
            .update({_id:id},{$set:data})
            .exec();
    }

}