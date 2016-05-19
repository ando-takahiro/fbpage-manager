import React from 'react';
import SpinnerWindow from './SpinnerWindow';
import LoginWindow from './LoginWindow';
import FBPageManageWindow from './FBPageManageWindow';
import hasPermissions from '../util/hasPermissions';

const STATE_INIT = Symbol();
const STATE_LOGIN_PROMPT = Symbol();
const STATE_LOGIN_PROMPT_RETRY = Symbol();
const STATE_LOGGING_IN = Symbol();
const STATE_ACTIVE = Symbol();

const PERMISSIONS = ['publish_pages', 'manage_pages', 'pages_show_list'];

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
        this.reloginIfNeed();
      } else {
        this.setState({ state: STATE_LOGIN_PROMPT });
      }
    });
  }

  //
  // event handlers(login flow)
  //
  reloginIfNeed() {
    this.FB.api(
      '/me/permissions',
      'GET',
      {},
      (response) => {
        if (hasPermissions(response, PERMISSIONS)) {
          // We don't need to login, so call after login function
          this.afterLogin();
        } else {
          // We need to login, so show login window
          this.setState({ state: STATE_LOGIN_PROMPT });
        }
      }
    );
  }

  loginRequest = () => {
    this.FB.login(this.loginDone, { scope: PERMISSIONS.join(',') });
    this.setState({ state: STATE_LOGGING_IN });
  }

  loginDone = (response) => {
    if (response.authResponse) {
      this.afterLogin();
    } else {
      this.setState({ state: STATE_LOGIN_PROMPT_RETRY });
    }
  }

  afterLogin() {
    this.setState({ state: STATE_ACTIVE });
  }

  //
  // render
  //
  render() {
    switch (this.state.state) {
      case STATE_INIT:
        return <SpinnerWindow message="Initializing..." />;

      case STATE_LOGIN_PROMPT:
        return <LoginWindow request={this.loginRequest} />;

      case STATE_LOGIN_PROMPT_RETRY:
        return (
          <LoginWindow
            request={this.loginRequest}
            notification="Login failed. Please retry."
          />
        );

      case STATE_LOGGING_IN:
        return <SpinnerWindow message="Logging in..." />;

      case STATE_ACTIVE:
        return <FBPageManageWindow fb={this.FB} />;

      default:
        throw new Error('unexpected state');
    }
  }
}

