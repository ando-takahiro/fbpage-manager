import React from 'react';
import { Block, Text } from 'essence-core';
import Btn from 'essence-button';
import Toast from 'essence-toast';

export default class FBPage extends React.Component {
  constructor(props) {
    super(props);

    this.FB = props.fb;
    this.request = props.request;
    this.done = props.done;
  }

  login = () => {
    this.request();
    this.FB.login(this.done);
  }

  render() {
    let toast;
    if (this.props.notification) {
      toast = (
        <Toast classes="e-text-white" visible="false" delay="5000">
          {this.props.notification}
        </Toast>
      );
    }

    return (
      <Block classes="e-row fill e-v-center">
        <Block classes="brick brick-12">
          <Block classes="e-row">
            <Block classes="brick brick-12">
              <Text>This application needs to be authorized.</Text>
            </Block>
          </Block>
          <Block classes="e-row">
            <Block classes="brick brick-12">
              <Btn
                label="Login with Facebook"
                ripple="false"
                type="primary"
                className="raised"
                onClick={this.login}
              />
            </Block>
          </Block>
          {toast}
        </Block>
      </Block>
    );
  }
}

FBPage.propTypes = {
  // Required
  fb: React.PropTypes.object.isRequired,
  request: React.PropTypes.func.isRequired,
  done: React.PropTypes.func.isRequired,

  // Optional
  notification: React.PropTypes.string,
};



