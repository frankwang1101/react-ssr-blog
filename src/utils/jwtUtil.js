import jwt from 'jwt-simple'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import { isObjectEmpty } from './util'
import User from '../database/User'

//验证token
export function checkJwt(token, cb) {
  try {
    const decode = jwt.decode(token, 'jwtSecret');
    if (decode.exp > Date.now()) {
      const id = decode.info._id;
      const username = decode.info.username;
      const url = 'http://localhost:8080/checkjwt';
      fetch(url, {
        method: 'post',
        body: JSON.stringify({ _id: id, username: username })
      }).then(res => res.json()).then(result => {
        //存在用户数据，则存入state，否则去掉本地储存的token
        if (result && isObjectEmpty(result)) {
          cb(result);
        }
      })

    }
  } catch (e) {
    console.log(e)
  }

}

export function serverJwtValid(token, cb) {
  try {
    const decode = jwt.decode(token, 'jwtSecret');
    if (decode.exp > Date.now()) {
      const _id = decode.info._id;
      const username = decode.info.username;
      User.checkjwt({ _id, username }).then(result => {
        cb(result)
      }).catch(err => {
        console.log(err)
        cb(err)
      })

    } else {
      cb('登录验证已过期，请重新登录!')
    }
  } catch (e) {
    console.log(e);
  }
}

export function addToken(info, req) {
  try {
    const expire = moment().add(7, 'days').valueOf();
    const token = jwt.encode({ exp: expire, info: { username: info.username, _id: info._id }, iss: 'admin' }, 'jwtSecret');
    return token;
  } catch (err) {
    console.log(err)
  }
  return null;
}

export function updateToken(info, token) {
  try {
    let decode = jwt.decode(token, 'jwtSecret');
    decode = Object.assign({}, decode, { info: { username: info.username, _id: info._id } });
    token = jwt.encode(decode, 'jwtSecret');
    return token;
  } catch (err) {
    console.log(err)
  }
  return null;
}