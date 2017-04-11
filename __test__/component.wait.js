//由于renderer无法导入css文件，所以无法测试
// import React from 'react'
// import Post from '../src/components/Post'
// import renderer from 'react-test-renderer'

// test('Post should like this', () => {
// 	const title = 'aaaa',
// 		nickname = 'jack',
// 		gender = 'male',
// 		avatar = 'noavatar',
// 		content = 'aaa',
// 		create_at = 'bbb';
//   const	author = { nickname,avatar,gender,_id:111};
// 	const post = { _id: 222, title, content, create_at, author};
// 	const userInfo = {
// 		_id : 222
// 	};
// 	const component = renderer.create(
// 		<Post post={post} userInfo={userInfo} />
// 	)
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
// })