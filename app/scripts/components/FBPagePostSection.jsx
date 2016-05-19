import React from 'react';
import { Block, Text } from 'essence-core';

export default class FBPagePostSection extends React.Component {
  constructor(props) {
    super(props);

    this.FB = props.fb;
  }

  render() {
    return (
      <Block classes="e-row">
        <Block classes="brick brick-12 e-h-center">
          <Text>Let's post a new page.</Text>
        </Block>
      </Block>
    );
  }
}

FBPagePostSection.propTypes = {
  // Required
  fb: React.PropTypes.object.isRequired,
};

