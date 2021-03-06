import React from 'react';
import { Block } from 'essence-core';
import Progress from 'essence-progress';

export default function SpinnerWindow(props) {
  return (
    <Block className="e-row fill e-v-center">
      <Block className="e-row brick brick-12" >
        <Block className="brick brick-12 e-h-center">
          {props.message}
        </Block>
        <Block className="brick brick-12 e-h-center e-margin-top-50">
          <Progress id="loading-spinner" type="circle" />
        </Block>
      </Block>
    </Block>
  );
}

SpinnerWindow.propTypes = {
  message: React.PropTypes.string,
};
