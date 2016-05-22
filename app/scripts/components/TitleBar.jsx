import React from 'react';
import { Text } from 'essence-core';
import AppBar from 'essence-appbar';
import Menu from 'essence-menu';

export default class TitleBar extends React.Component {
  static propTypes = {
    // Required
    current: React.PropTypes.number.isRequired,
    pages: React.PropTypes.array.isRequired,
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

  currentPageName() {
    const cur = this.state.pages[this.state.current];
    return cur ? cur.name : undefined;
  }

  render() {
    const pages = this.state.pages.map((page, index) => (
      <Text className={'e-text-black'} key={index}>
        {page.name}
      </Text>
    ));

    return (
      <AppBar className="e-background-indigo-500 e-text-white">
        <Menu
          id="pages-menu"
          type="cover"
          icon="navigation-menu"
          className="e-left"
        >
          {pages}
        </Menu>
        <Text>{this.currentPageName()}</Text>
      </AppBar>
    );
  }
}

