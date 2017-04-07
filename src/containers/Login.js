import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { connect } from 'react-redux'
import { login } from '../actions/Action'


const FormItem = Form.Item;

class RegistrationForm extends React.Component {

  constructor(args) {
    super(args);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
  }

  componentWillMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login(values);
      }
    });
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
      <div style={{ "marginTop": "20px" }}>
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
                required: true, message: 'Please enter username',
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
                required: true, message: 'Please enter password!',
              }],
            })(
              <Input type="password" rows={4} />
              )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">Post</Button>
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
  login: (data) => { dispatch(login(data)) }
})

export default connect(mapStateToProp, mapActionToDispatch)(WrappedRegistrationForm)

