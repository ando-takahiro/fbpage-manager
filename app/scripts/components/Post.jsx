import React from 'react';
import { Block, Text } from 'essence-core';
import Icon from 'essence-icon';
import moment from 'moment';
import getImpressionValue from '../util/getImpressionValue';
import getPublishIconName from '../util/getPublishIconName';

export default class Post extends React.Component {
  static propTypes = {
    // Required
    post: React.PropTypes.object.isRequired,
  };

  state = {
    open: false,
  }

  toggleExpand = () => {
    this.setState({
      ...this.state,
      open: !this.state.open,
    });
  }

  render() {
    const post = this.props.post;
    const openStatusClass = this.state.open ? 'post-open' : 'post-close';

    let icon;
    if (post.picture) {
      const className = `post-icon ${openStatusClass}`;
      icon = <img src={post.picture} className={className} alt="" />;
    } else {
      const className = `post-icon e-text-indigo-500 e-display-2 ${openStatusClass}`;
      icon = <Icon name="editor-mode-edit" className={className} />;
    }

    return (
      <Block className="e-row">
        <Block className="brick brick-12" onClick={this.toggleExpand}>
          <Block className="e-row">
            {icon}
            <Block className={`post-message ${openStatusClass}`}>
              {post.message}
            </Block>
          </Block>
        </Block>
        <Block className="brick brick-12">
          <Block className="e-row">
            <Block className="brick brick-12">
              {getImpressionValue(post)} view
              <Text className="e-right">
                <Icon
                  name={getPublishIconName(post.is_published)}
                  className="e-text-indigo-500"
                />
                {moment(post.created_time).fromNow()}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

