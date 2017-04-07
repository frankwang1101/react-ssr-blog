import React from 'react';
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, Alert } from 'antd';
import { connect } from 'react-redux'
import { register } from '../actions/Action'
import UploadAvatar from '../components/Avatar'


const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {

  constructor(args) {
    super(args);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
    this.normFile = this.normFile.bind(this)
  }

  componentWillMount() {
    console.log('enter......')
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // this.props.register(values);
      }
    });
  }
  normFile(e) {
    return e.path;
  }
  handleConfirmBlur(e) {
    const value = e.target.value;
    console.log(value);
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { hasResult, resultMsg } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <div style={{ marginTop: "20px" }}>
        {hasResult ?
          <Alert
            message={resultMsg}
            type="success"
            showIcon
          /> : ''}
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}
            label="Username"
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input your username',
              }],
            })(
              <Input placeholder="enter username~" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want other to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Gender"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select your gender!' }],
            })(
              <Select placeholder="Please select a country">
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Avatar"
          >
            {getFieldDecorator('avatar', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <UploadAvatar />
              )}
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a>agreement</a></Checkbox>
              )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">Register</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProp = (state) => {
  const { hasResult, resultMsg } = state.main;
  return {
    hasResult, resultMsg
  }
}

const mapActionToDispatch = (dispatch) => ({
  register: (data) => { dispatch(register(data)) }
})

export default connect(mapStateToProp, mapActionToDispatch)(WrappedRegistrationForm)

