import React from 'react'
import LzEditor from 'react-lz-editor'

export default class Text extends React.Component {
  constructor(args) {
    super(args);
    this.receiveHtml = this.receiveHtml.bind(this);
  }
  receiveHtml() {
    // console.log("Recieved content", content);
  }
  render() {
    return (<LzEditor
      active={true}
      ImportContent={this.props.value}
      cbReceiver={this.receiveHtml}
      FullScreen={false}
      ConvertFormat="html"
    />)
  }

}
Text.prototype = {
  value: React.PropTypes.string,
}

