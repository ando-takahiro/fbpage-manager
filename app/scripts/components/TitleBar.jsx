import React from 'react';
import { Block, Text } from 'essence-core';
import AppBar from 'essence-appbar';
import Menu from 'essence-menu';

export default class TitleBar extends React.Component {
  static propTypes = {
    // Required
    current: React.PropTypes.number.isRequired,
    pages: React.PropTypes.array.isRequired,
    onPageChanged: React.PropTypes.func.isRequired,
    onLogoutRequest: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      pages: [...props.pages],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.current,
      pages: [...nextProps.pages],
    });
  }

  getCurrentPageName() {
    const cur = this.state.pages[this.state.current];
    return cur ? cur.name : undefined;
  }

  render() {
    const pages = this.state.pages.map((page, index) => (
      <Text className="e-text-black list-item" key={page.id}>
        <Text onClick={() => this.props.onPageChanged(index)}>
          {page.name}
        </Text>
      </Text>
    ));

    return (
      <AppBar className="e-background-indigo-500 e-text-white">
        {/* page list */}
        <Menu
          type="cover"
          icon="navigation-menu"
          className="e-left pages-menu"
        >
          {pages}
        </Menu>

        {/* current page name */}
        <Text>{this.getCurrentPageName()}</Text>

        {/* settings */}
        <Block className="e-right">
          <Menu
            type="cover"
            icon="action-settings"
            className="e-right pages-menu"
          >
            <Text className="e-text-black">
              <Text onClick={this.props.onLogoutRequest}>Logout</Text>
            </Text>
          </Menu>
        </Block>
      </AppBar>
    );
  }
}
