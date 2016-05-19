import React from 'react';
import { Block, Text } from 'essence-core';
import { List, ListItem } from 'essence-list';

export default class FBPageListSection extends React.Component {
  static propTypes = {
    // Required
    fb: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.FB = props.fb;
    this.FB.api(
      '/me/accounts',
      'GET',
      {},
      (response) => {
        this.setState({ ...this.state, pages: response.data });
      });
  }

  state = {
    pages: [],
  };

  render() {
    const pages = this.state.pages.map((page, index) => (
      <ListItem key={index}>
        <Block classes={'content e-left'}>
          {page.name}
        </Block>
      </ListItem>
    ));

    return (
      <div>
        <Text type={'h1'} classes={'e-title e-h-center'}>Pages</Text>
        <Block classes="brick brick-12">
          <Block classes="e-row">
            <Block classes="brick brick-12">
              <List type={'navigation'}>
                {pages}
              </List>
            </Block>
          </Block>
        </Block>
      </div>
    );
  }
}

