import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Dropdown, Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router'
import { isObjectEmpty } from '../utils/util'
import * as Actions from '../actions/Action'

require('../style/index.less')

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(args) {
    super(args)
    this.menuClick = this.menuClick.bind(this)
  }
  componentWillMount() {

  }
  componentDidMount() {
    // 首屏加载时没有localStorage，所以只能在加载后校验
    if (!this.props.userInfo._id) {
      this.props.checkJwt();
    }
  }
  menuClick(item) {
    if (item) {
      switch (item.key) {
        case 'logout':
          this.props.logout();
          break;
        default:
          break;
      }
    }
  }
  render() {
    const { userInfo } = this.props
    let menuList = [];
    if (isObjectEmpty(userInfo)) {
      menuList = [
        { path: "/", text: "Home Page" },
        { path: `/my/${userInfo._id}`, text: "My Page" },
        { path: "/post", text: "Add Post" },
        { text: "Logout", method: "logout" },
      ]
    } else {
      menuList = [
        { path: "/", text: "Home" },
        { path: "/add", text: "SignUp" },
        { path: "/login", text: "Login" },
      ]
    }
    const menu = (
      <Menu onClick={this.menuClick}>
        {
          menuList.map((v) => {
            let result;
            if (v.path) {
              result = <Menu.Item key={`header${v.text}`}><Link to={v.path}>{v.text}</Link></Menu.Item>
            } else {
              result = <Menu.Item key={v.method} >{v.text}</Menu.Item>
            }
            return result;
          })
        }
      </Menu>
    )

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Dropdown overlay={menu} className="header-dropdown">
            <a className="ant-dropdown-link header-link" href="#">
              <Icon type="bars" />
            </a>
          </Dropdown>
        </Header>
        <Content className="content">
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by FrankWang
        </Footer>
      </Layout>

    );
  }
}

const mapStateToProp = (state) => {
  const { userInfo } = state.main
  return { userInfo }
}

const mapActionToDispatch = (dispatch) => ({
  logout: () => dispatch(Actions.logout()),
  updateInfo: (info) => dispatch(Actions.updateInfo(info)),
  checkJwt: () => dispatch(Actions.checkJwt())
})

export default connect(mapStateToProp, mapActionToDispatch)(App);
