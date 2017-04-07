import User from './User'
import Post from './Post'
// User.create({
//     nickname:'frank1',
//     username:'123421',
//     pwd:'1234',
//     gender:'1234'
// });
var u = User.getUserById('58d9feb101bb337c8c7d6dac');
u.then(res => console.log(res))

// Post.create({
//     title:'abcd',
//     content:'edfs',
//     author:'58d9feb101bb337c8c7d6dac'
// })
Post.findAll().then(res => {
    console.log(res)
})