import React from 'react';
import { Link } from 'react-router'
import * as Util from '../utils/util'

export default class extends React.Component {
  render() {
    const { post, operate, userInfo } = this.props;
    const OperateItem =
      Util.renderDropdown([{ name: '编辑', method: 'edit' }, { name: '删除', method: 'delete' }], '操作', post._id, operate);
    return (
      <div className="post-row clearFix">
        <div className="row-block info-area clearFix">
          <div className="row-block info-title"><Link to={`/detail/${post._id}`}>{post.title}</Link></div>
          <div className="row-block info-name"><Link to={`/my/${post.author._id}`}>{post.author.nickname}</Link></div>
        </div>
        <pre className="row-block content-area">{post.content}</pre>
        <div className="row-block">
          <div className="row-block time-area">{post.create_at}</div>
          {
            (userInfo && userInfo._id === post.author._id) ? <div className="row-block operate-area">{OperateItem}</div> : ''
          }
        </div>
      </div>
    );
  }
}
