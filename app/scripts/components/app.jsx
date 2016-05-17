import React from 'react';

export default class App extends React.Component {
  static propTypes = {
    // Optional
    children: React.PropTypes.node,
    // Required
    fb: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const FB = props.fb;

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log('Logged in.');
        this.setState({ login: 'Logged in' });
      } else {
        FB.login();
        this.setState({ login: 'FB.Login' });
      }
    });
  }

  state = {
    login: 'FB.getLoginStatus',
  }

  render() {
    return (
      <div className="content">
        <p>login: {this.state.login}</p>
        {this.props.children}
      </div>
    );
  }
}

