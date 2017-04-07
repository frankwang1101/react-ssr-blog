import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { Icon, Spin, Input, Button } from 'antd'
import * as Actions from '../actions/Action'
import Post from '../components/Post'


class Detail extends Component {

  constructor(...args) {
    super(...args);
    this.operate = this.operate.bind(this);
    this.commentEdit = this.commentEdit.bind(this);
    this.commentDel = this.commentDel.bind(this);
    this.replyPost = this.replyPost.bind(this);
    this.textChange = this.textChange.bind(this);
    this.state = { text: '', textError: '' };
  }
  componentWillMount() {
    const id = this.props.params.id
    if (id) {
      this.props.getOnePost(id);
    } else {
      browserHistory.push('/');
    }
  }
  componentDidMount() {
  }
  operate({ key }) {
    const id = key.replace(/^(.+)And\d+\w+/, '$1');
    if (key.indexOf('edit') > -1) {
      browserHistory.push(`/edit/${id}`)
    } else {
      this.props.delPost(id);
    }
  }
  textChange(e) {
    const text = e.target.value;
    if (text.length < 150) {
      this.setState({ text, textError: '' });
    } else {
      this.setState({ textError: 'text length should be less than 150!' });
    }
  }
  replyPost() {
    const content = this.state.text;
    const author = this.props.userInfo._id;
    const post = this.props.params.id;
    if (typeof content === 'string' && content.length > 0 && content.length < 150) {
      this.setState({ textError: '', text: '' })
      this.props.addComment({ content, author, post });
    } else {
      this.setState({ textError: 'enter content first!' });
    }
  }
  commentEdit() {
    // browserHistory.push(`/edit/${id}`);
  }
  commentDel(data) {
    this.props.delComment(data);
  }
  render() {
    const { detailInfo, userInfo } = this.props;
    const operateFuc = this.operate;

    const comments = (detailInfo.comments || []).map((v) => (<div className="comment-row clearFix" key={`commentKey${v._id}`}>
      <div className="row-block comment-info-area">
        <div className="author pull-left"><Link to={`/my/${v.author._id}`}>{v.author.nickname}</Link></div>
        <div className="create-at pull-left">{v.create_at}</div>
      </div>
      <div className="row-block content">{v.content}</div>
      {
        (userInfo && userInfo._id === v.author._id) ?
          (<div className="row-block operate">
            <div className="self-operate clearFix">
              <a className="delete pull-right"
                onClick={() => this.commentDel({ _id: v._id, author: v.author._id, post: v.post })}
              >删除<Icon type="delete" /></a>
            </div>
          </div>) : ''
      }
    </div>)
    )
    let returnValue = (<div style={{ "width": "980px", "margin": "0 auto", "padding": "20px", "minHeight": "830px" }}>
      <Spin tip="Loading..." /></div>);
    if (detailInfo.post._id === this.props.params.id) {
      returnValue = (
        <div style={{ "width": "980px", "margin": "0 auto", "padding": "20px", "minHeight": "830px" }}>
          <Post key={`postKey${detailInfo.post._id}`} post={detailInfo.post} userInfo={userInfo} operate={operateFuc} />
          <div className="post-row clearFix">
            {comments}
            <div className="reply-area clearFix">
              <Input type="textarea" placeholder="Say Something...."
                autosize={{ minRows: 2, maxRows: 6 }}
                onChange={this.textChange} value={this.state.text} />
              {(this.state && this.state.textError.length > 0) ?
                <span style={{ "color": "#f00", "fontSize": "10px" }}>{this.state.textError}</span> : ''}
              <Button type="primary" className="pull-right" onClick={this.replyPost}>Reply</Button>
            </div>

          </div>
        </div>
      );
    }
    return returnValue;
  }
}

const mapStateToProps = (state) => {
  const { detailInfo, userInfo } = state.main
  return {
    detailInfo, userInfo
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOnePost: (id) => { dispatch(Actions.getOnePost(id)) },
  delPost: (id) => { dispatch(Actions.removePost(id)) },
  delComment: (data) => { dispatch(Actions.removeComment(data)) },
  addComment: (data) => { dispatch(Actions.saveComment(data)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
