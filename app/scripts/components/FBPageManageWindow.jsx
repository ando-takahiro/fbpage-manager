import React from 'react';
import { Divider } from 'essence-core';
import FBPagePostSection from './FBPagePostSection';
import FBPageListSection from './FBPageListSection';

export default function FBPageManageWindow(props) {
  return (
    <div>
      <FBPageListSection fb={props.fb} />
      <Divider classes={'thin e-background-indigo-500'} />
      <FBPagePostSection fb={props.fb} />
      <FBPagePostSection fb={props.fb} />
    </div>
  );
}

FBPageManageWindow.propTypes = {
  // Required
  fb: React.PropTypes.object.isRequired,
};

