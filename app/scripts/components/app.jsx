import React from 'react';
import SpinnerWindow from './SpinnerWindow';
import LoginWindow from './LoginWindow';

const STATE_INIT = 0;
const STATE_LOGIN_PROMPT = 1;
const STATE_LOGIN_PROMPT_RETRY = 2;
const STATE_LOGGING_IN = 3;
const STATE_ACTIVE = 4;

export default class App extends React.Component {
  static propTypes = {
    // Required
    fb: React.PropTypes.object.isRequired,
  };

  //
  // initializers
  //
  constructor(props) {
    super(props);

    const FB = this.FB = props.fb;
    this.state = {
      state: STATE_INIT,
    };

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.setState({ state: STATE_ACTIVE });
      } else {
        this.setState({ state: STATE_LOGIN_PROMPT });
      }
    });
  }

  //
  // event handlers
  //
  loginRequest = () => {
    this.setState({ state: STATE_LOGGING_IN });
  }

  loginDone = (response) => {
    if (response.authResponse) {
      this.setState({ state: STATE_ACTIVE });
    } else {
      this.setState({ state: STATE_LOGIN_PROMPT_RETRY });
    }
  }

  //
  // render
  //
  render() {
    switch (this.state.state) {
      case STATE_INIT:
        return <SpinnerWindow message="Initializing..." />;

      case STATE_LOGIN_PROMPT:
        return (
          <LoginWindow
            fb={this.FB}
            request={this.loginRequest}
            done={this.loginDone}
          />
        );

      case STATE_LOGIN_PROMPT_RETRY:
        return (
          <LoginWindow
            fb={this.FB}
            request={this.loginRequest}
            done={this.loginDone}
            notification="Login failed. Please retry."
          />
        );

      case STATE_LOGGING_IN:
        return <SpinnerWindow message="Logging in..." />;

      case STATE_ACTIVE:
        return <SpinnerWindow />;

      default:
        throw new Error('unexpected state');
    }
  }
}

