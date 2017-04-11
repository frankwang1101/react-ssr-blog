import * as reducers from '../src/reducers/reducers'

test('should empty userinfo', () => {
	const type = 'EMPTYLOGININFO';
	const state = {
		userInfo: {}
	}
	expect(reducers.main({},{type})).toEqual(state);
})
test('should return register msg state', () => {
	const resultMsg = 'hahahahaha';
	const type = 'REGISTERSTATUS';
	const state = {
		resultMsg,
		hasResult: true
	};
	expect(reducers.main({},{type,msg:resultMsg})).toEqual(state);
})
