import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'
import nock from 'nock'
import { CONFIG } from '../src/config/config'



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action test',() => {
	afterEach(() => {
		nock.cleanAll();
	})

	it('fetch post fail when use wrong id', () => {
		nock('http://localhost:8080/')
			.get('/postlist')
			.reply(200, { msg: 'hello' });
		
		const expectAction = [{ type: 'REGISTERSTATUS', msg: 'hello'}];
		const store = mockStore({});

		const getPostTest = function getPostTest(){
			return dispatch => {
				let url = `${CONFIG.URL}${CONFIG.POSTLIST}`;
				return fetch(url).then(res => res.json()).then(json => {
					dispatch({ type: 'REGISTERSTATUS', msg: json.msg});
				})
			}
		}

		return store.dispatch(getPostTest())
			.then(() => {
				expect(store.getActions()).toEqual(expectAction);
			})
	})
})