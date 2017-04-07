import { message, Menu, Dropdown } from 'antd'
import React from 'react'

export function sendMessage(type, msg, dur, cb) {
  message[type](msg, dur, cb);
}

export function renderDropdown(arr, head, key, cb) {
  const menuItems = arr.map((v) => (<Menu.Item key={key + 'And' + v.method}>
    {v.name}
  </Menu.Item>)
  )
  const menu = <Menu onClick={cb || ''}>{menuItems}</Menu>
  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" href="#">
        {head}
      </a>
    </Dropdown>
  );
}

export function isObjectEmpty(obj) {
  if (typeof obj !== 'object') {
    return !1;
  }
  if (Object.keys(obj).length > 0) {
    return !0;
  }
  return !1;
}
