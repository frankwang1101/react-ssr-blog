import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { connect } from 'react-redux'
import * as Actions from '../actions/Action'
import Text from '../components/Text'


const FormItem = Form.Item;

class RegistrationForm extends React.Component {

  constructor(args) {
    super(args);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { title: '', content: '' }
  }

  componentWillMount() {
    if (this.props.type === 'edit' && this.props.post._id !== this.props.params.id) {
      const pid = this.props.params.id;
      this.props.getOnePost(pid);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.type !== 'edit') {
          this.props.addPost(values);
        } else {
          const post = Object.assign({ _id: this.props.post._id }, values);
          this.props.updatePost(post);
        }
      }
    });
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
            label="Title"
            hasFeedback
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: 'Please write post title',
              }],
            })(
              <Input placeholder="enter username~" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Content"
            hasFeedback
          >
            {getFieldDecorator('content', {
              rules: [{
                required: true, message: 'Please enter post content!',
              }],
            })(
              <Text />
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

const WrappedRegistrationForm = Form.create({
  mapPropsToFields(props) {
    return (props.type === 'edit' && props.post) ? {
      title: { value: props.post.title },
      content: { value: props.post.content || '' }
    } : {}
  }
})(RegistrationForm);

const mapStateToProp = (state) => {
  const { hasResult, resultMsg, detailInfo: { post } } = state.main;
  return {
    hasResult, resultMsg, post
  }
}

const mapActionToDispatch = (dispatch) => ({
  addPost: (data) => { dispatch(Actions.addPost(data)) },
  getOnePost: id => dispatch(Actions.getOnePost(id)),
  updatePost: (data) => dispatch(Actions.updatePost(data))
})

export default connect(mapStateToProp, mapActionToDispatch)(WrappedRegistrationForm)

