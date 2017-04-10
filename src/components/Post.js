import React from 'react';
import { Link } from 'react-router'
import * as Util from '../utils/util'

export default class extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      infoFlag: false
    }
    this.hover = this.hover.bind(this);
  }
  hover(e, f) {
    const thiz = this;
    // two step in case that someone leave the name but enter the card
    if (e.type === 'mouseleave') {
      this.timer = setTimeout(() => {
        thiz.setState({
          infoFlag: f
        })
      }, 100);
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.setState({
        infoFlag: f
      })
    }
  }
  render() {
    console.log('....flag');
    const { post, operate, userInfo } = this.props;
    const OperateItem =
      Util.renderDropdown([{ name: '编辑', method: 'edit' }, { name: '删除', method: 'delete' }], '操作', post._id, operate);
    return (
      <div className="post-row clearFix">
        <div className="row-block info-area clearFix">
          <div className="row-block info-title"><Link to={`/detail/${post._id}`}>{post.title}</Link></div>
          <div className="row-block info-name" >
            <Link to={`/my/${post.author._id}`} onMouseEnter={(e) => this.hover(e, true)}
              onMouseLeave={(e) => this.hover(e, false)} >
              {post.author.nickname}</Link>
          </div>
          {this.state.infoFlag ?
            <div className="info-card" onMouseEnter={(e) => this.hover(e, true)} onMouseLeave={(e) => this.hover(e, false)} >
              <div className="avatar-info"><img style={{ width: '60px', height: '70px' }} alt="..." /></div>
              <div className="word-info">
                <div className="info-name">{post.author.nickname}</div>
                <div className="info-gender">{post.author.gender || 'secret'}</div></div>
            </div> : ''}
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
