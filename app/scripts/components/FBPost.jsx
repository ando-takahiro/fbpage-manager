import React from 'react';
import { Block, Text } from 'essence-core';
import Icon from 'essence-icon';
import Image from 'essence-image';
import { ListItem } from 'essence-list';
import moment from 'moment';
import getImpressionValue from '../util/getImpressionValue';

export default function FBPost(props) {
  const post = props.post;
  const icon = post.picture ?
    <Image src={post.picture} classes="e-avatar e-left" /> :
    <Icon name="editor-mode-edit" className="e-avatar e-left e-text-indigo-500" />;

  return (
    <ListItem>
      <Text type="a">
        {icon}
        <Block classes="content e-left">
          <Text classes="primary">{post.message}</Text>
          <Text classes="secondary">
            {getImpressionValue(post)} view
            <Text classes="e-right">
              <Icon
                name={post.is_published ? 'social-public' : 'notification-vpn-lock'}
                className={"e-text-indigo-500"}
              />
              {moment(post.created_time).fromNow()}
            </Text>
          </Text>
        </Block>
      </Text>
    </ListItem>
  );
}

FBPost.propTypes = {
  // Required
  post: React.PropTypes.object.isRequired,
};

