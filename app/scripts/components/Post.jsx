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
      const classes = `post-icon ${openStatusClass}`;
      icon = <img src={post.picture} className={classes} alt="" />;
    } else {
      const classes = `post-icon e-text-indigo-500 e-display-2 ${openStatusClass}`;
      icon = <Icon name="editor-mode-edit" className={classes} />;
    }

    return (
      <Block classes="e-row">
        <Block classes="brick brick-12" onClick={this.toggleExpand}>
          <Block classes="e-row">
            {icon}
            <Block classes={`post-message ${openStatusClass}`}>
              {post.message}
            </Block>
          </Block>
        </Block>
        <Block classes="brick brick-12">
          <Block classes="e-row">
            <Block classes="brick brick-12">
              {getImpressionValue(post)} view
              <Text classes="e-right">
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

