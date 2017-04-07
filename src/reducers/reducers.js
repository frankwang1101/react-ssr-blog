
export function main(state = {}, action) {
  switch (action.type) {
    case 'EMPTYLOGININFO':
      return Object.assign({}, state, { userInfo: {} })
    case 'REGISTERSTATUS':
      return Object.assign({}, state, { resultMsg: action.msg, hasResult: true });
    case 'RENDERPOSTLIST':
      return Object.assign({}, state, { postInfo: { list: action.list } })
    case 'LOGINSUCCESS':
      return Object.assign({}, state, { userInfo: action.userInfo });
    case 'UPDATELOGININFO': {
      const info = Object.assign({}, state.userInfo, action.info);
      return Object.assign({}, state, { userInfo: info });
    }
    case 'POSTDETAILUPDATE':
      return Object.assign({}, state, { detailInfo: action.detail });
    default:
      return state;
  }
}
