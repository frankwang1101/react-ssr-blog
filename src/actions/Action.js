import { browserHistory } from 'react-router'
import fetch from 'isomorphic-fetch'
import * as Util from '../utils/util'

const CONFIG = {
  URL: 'http://localhost:8080/',
  SIGNUP: 'signup',
  ADDPOST: 'post',
  POSTLIST: 'postlist',
  LOGIN: 'login',
  POST: 'post',
  DELETEPOST: 'del',
  COMMENT: 'comment',
  CHECK: 'checkjwt'
}

export function register(data) {
  return () => {
    const url = `${CONFIG.URL}${CONFIG.SIGNUP}`;
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
    }).then(res => res.json()).then(json => {
      if (json.success === true) {
        Util.sendMessage('success', json.msg, 2, () => {
          browserHistory.push('/login');
        });
      } else {
        Util.sendMessage('error', json.msg, 2);
      }
    })
  }
}

export function getPost(data) {
  return dispatch => {
    let url = `${CONFIG.URL}${CONFIG.POSTLIST}`;
    if (data) {
      url += `/${data}`
    }
    fetch(url, {
      method: 'get',
    }).then(res => res.json()).then(json => {
      if (json.success === true) {
        dispatch({ type: 'RENDERPOSTLIST', list: json.list })
      } else {
        Util.sendMessage('error', json.msg, 2);
      }
    })
  }
}

export function removePost(data) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const url = `${CONFIG.URL}${CONFIG.POST}/${data}`;
    const h = new Headers({ Authrorization: token });
    fetch(url, {
      method: 'delete',
      headers: h
    }).then(res => res.json()).then(result => {
      if (result.success === true) {
        Util.sendMessage('success', result.msg, 2);
        dispatch(getPost());
        browserHistory.push('/');
        if (result.token) {
          localStorage.setItem('token', token);
        }
      } else {
        Util.sendMessage('error', result.msg, 2);
      }
    })
  }
}

export function updatePost(data) {
  return () => {
    const url = `${CONFIG.URL}${CONFIG.POST}`;
    const headers = new Headers({ Authrorization: token });
    fetch(url, {
      method: 'put',
      headers,
      body: JSON.stringify(data)
    }).then(res => res.json()).then(result => {
      if (result.success === true) {
        browserHistory.push(`/my/${data._id}`);
        Util.sendMessage('success', result.msg, 2);
        if (result.token) {
          localStorage.setItem('token', token);
        }
      } else {
        Util.sendMessage('error', result.msg, 2);
      }
    })
  }
}

export function getOnePost(data) {
  return dispatch => {
    const url = `${CONFIG.URL}${CONFIG.POST}/${data}`;
    fetch(url).then(res => res.json()).then(result => {
      if (result.post) {
        dispatch({ type: 'POSTDETAILUPDATE', detail: { post: result.post, comments: result.comments } });
      } else {
        browserHistory.push('/');
        Util.sendMessage('error', '帖子不存在或者已被删除!', 2)
      }
    })
  }
}

export function addPost(data) {
  return dispatch => {
    const url = `${CONFIG.URL}${CONFIG.ADDPOST}`;
    const token = localStorage.getItem('token');
    const headers = new Headers({ Authrorization: token });
    fetch(url, {
      method: 'post',
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json()).then(result => {
        if (result.success === true) {
          getOnePost(data.post)(dispatch);
          Util.sendMessage('success', result.msg, 2);
          if (result.token) {
            localStorage.setItem('token', token);
          }
        } else {
          Util.sendMessage('error', result.msg, 2);
        }
      })
  }
}

export function saveComment(data) {
  return dispatch => {
    const token = localStorage.getItem('token');
    const url = `${CONFIG.URL}${CONFIG.COMMENT}`;
    const headers = new Headers({ Authrorization: token });
    fetch(url, {
      method: 'post',
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json()).then(result => {
        if (result.success === true) {
          getOnePost(data.post)(dispatch);
          Util.sendMessage('success', result.msg, 2);
          if (result.token) {
            localStorage.setItem('token', token);
          }
        } else {
          Util.sendMessage('error', result.msg, 2);
        }
      })
  }
}

export function removeComment(data) {
  return dispatch => {
    const token = localStorage.getItem('token');
    const url = `${CONFIG.URL}${CONFIG.COMMENT}/`;
    const headers = new Headers({ Authrorization: token });
    fetch(url, {
      method: 'post',
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json()).then(result => {
        if (result.success === true) {
          getOnePost(data.post)(dispatch);
          Util.sendMessage('success', result.msg, 2);
          if (result.token) {
            localStorage.setItem('token', token);
          }
        } else {
          Util.sendMessage('error', result.msg, 2);
        }
      })
  }
}

export function updateComment(data) {
  return dispatch => {
    const url = `${CONFIG.URL}${CONFIG.COMMENT}/`;
    const token = localStorage.getItem('token');
    const headers = new Headers({ Authrorization: token });
    fetch(url, {
      method: 'post',
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json()).then(result => {
        if (result.success === true) {
          getOnePost(data.post)(dispatch);
          Util.sendMessage('success', result.msg, 2);
          if (result.token) {
            localStorage.setItem('token', token);
          }
        } else {
          Util.sendMessage('error', result.msg, 2);
        }
      })
  }
}

export function login(data) {
  return dispatch => {
    const url = `${CONFIG.URL}${CONFIG.LOGIN}`;
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      try {
        if (json.success === true) {
          dispatch({ type: 'LOGINSUCCESS', userInfo: json.info })
          localStorage.removeItem('token');
          localStorage.setItem('token', json.info.token);
          Util.sendMessage('success', 'login success!', 2, () => {
            browserHistory.push(`/my/${json.info._id}`);
          })
        } else {
          Util.sendMessage('error', json.msg, 2);
        }
      } catch (err) {
        console.log(err);
      }
    })
  }
}

export function updateInfo(info) {
  return dispatch => {
    dispatch({ type: 'UPDATELOGININFO', info })
  }
}

export function checkJwt() {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const url = `${CONFIG.URL}${CONFIG.CHECK}`;
      const headers = new Headers({ Authrorization: token });
      fetch(url, {
        method: 'get',
        headers
      }).then(res => res.json()).then(result => {
        if (result.success === true) {
          localStorage.setItem('token', result.token);
          dispatch(updateInfo(result.info));
        } else {
          localStorage.removeItem('token');
        }
      })
    }
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    browserHistory.push('/');
    dispatch({ type: 'EMPTYLOGININFO' });
  }
}
