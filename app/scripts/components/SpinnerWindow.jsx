import React from 'react';
import { Block } from 'essence-core';
import Progress from 'essence-progress';

export default function SpinnerWindow(props) {
  return (
    <Block classes="e-row fill e-v-center">
      <Block classes="e-row brick brick-12" >
        <Block classes="brick brick-12 e-h-center">
          {props.message}
        </Block>
        <Block classes="brick brick-12 e-h-center e-margin-top-50">
          <Progress type="circle" />
        </Block>
      </Block>
    </Block>
  );
}

SpinnerWindow.propTypes = {
  message: React.PropTypes.string,
};
