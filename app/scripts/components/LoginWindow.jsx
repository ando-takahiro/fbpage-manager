import React from 'react';
import { Block, Text } from 'essence-core';
import Btn from 'essence-button';
import Toast from 'essence-toast';

export default function LoginWindow(props) {
  let toast;
  if (props.notification) {
    toast = (
      <Toast className="e-text-white" visible="false" delay="5000">
        {props.notification}
      </Toast>
    );
  }

  return (
    <Block className="e-row fill e-v-center">
      <Block className="brick brick-12">
        <Block className="e-row">
          <Block className="brick brick-12">
            <Text>Page Manager</Text>
          </Block>
        </Block>
        <Block className="e-row">
          <Block className="brick brick-12">
            <Btn
              id="login-button"
              label="Login with Facebook"
              ripple="true"
              type="primary"
              className="raised"
              onClick={props.request}
            />
          </Block>
        </Block>
        {toast}
      </Block>
    </Block>
  );
}

LoginWindow.propTypes = {
  // Required
  request: React.PropTypes.func.isRequired,

  // Optional
  notification: React.PropTypes.string,
};

