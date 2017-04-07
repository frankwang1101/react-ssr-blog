import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getPost } from '../actions/Action'
import Post from '../components/Post'

class AppR extends Component {

  constructor(...args) {
    super(...args);
    this.operate = this.operate.bind(this);
  }
  componentWillMount() {
    const id = this.props.params.id
    this.props.getPost(id);
  }
  operate({ key }) {
    const id = key.replace(/^(.+)And\w+/, '$1');
    if (key.indexOf('edit') > -1) {
      browserHistory.push(`/edit/${id}`)
    } else {
      console.log(id);
    }
  }
  render() {
    const { list, userInfo } = this.props;
    const operateFuc = this.operate;
    const posts = list.map((v) => (
      <Post key={`postKey${v._id}`} post={v} operate={operateFuc} userInfo={userInfo} />
    ))
    return (
      <div style={{ "width": "980px", "margin": "0 auto", "padding": "20px" }}>
        {posts}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  console.log('state')
  const { postInfo: { list }, userInfo } = state.main
  return {
    list: list || {},
    userInfo
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppR)
