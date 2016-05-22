import React from 'react';
import { Block, Text } from 'essence-core';
import Btn from 'essence-button';
import Toast from 'essence-toast';

export default function LoginWindow(props) {
  let toast;
  if (props.notification) {
    toast = (
      <Toast classes="e-text-white" visible="false" delay="5000">
        {props.notification}
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

