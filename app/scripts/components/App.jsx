import React from 'react';
import SpinnerWindow from './SpinnerWindow';
import LoginWindow from './LoginWindow';
import PageWindow from './PageWindow';
import hasPermissions from '../util/hasPermissions';

const STATE_INIT = Symbol();
const STATE_LOGIN_PROMPT = Symbol();
const STATE_LOGIN_PROMPT_RETRY = Symbol();
const STATE_LOGGING_IN = Symbol();
const STATE_ACTIVE = Symbol();
const STATE_LOGGING_OUT = Symbol();

const PERMISSIONS = [
  'publish_pages',
  'manage_pages',
  'pages_show_list',
  'read_insights',
];

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

    this.FB = props.fb;
  }

  state = {
    state: STATE_INIT,
  }

  //
  // event handlers(login flow)
  //
  componentWillMount() {
    this.FB.getLoginStatus(this.onDidGetLoginStatus);
  }

  onDidGetLoginStatus = (response) => {
    if (response.status === 'connected') {
      this.FB.api(
        '/me/permissions',
        'GET',
        {},
        (resp) => {
          if (hasPermissions(resp, PERMISSIONS)) {
            // We don't need to login, so call after login function
            this.setState({ state: STATE_ACTIVE });
          } else {
            // We need to login, so show login window
            this.setState({ state: STATE_LOGIN_PROMPT });
          }
        }
      );
    } else {
      this.setState({ state: STATE_LOGIN_PROMPT });
    }
  }

  onLoginRequest = () => {
    this.FB.login(this.onDidLogin, { scope: PERMISSIONS.join(',') });
    this.setState({ state: STATE_LOGGING_IN });
  }

  onDidLogin = (response) => {
    if (response.authResponse) {
      this.setState({ state: STATE_ACTIVE });
    } else {
      this.setState({ state: STATE_LOGIN_PROMPT_RETRY });
    }
  }

  onLogoutRequest = () => {
    this.FB.logout(this.onDidLogout);
    this.setState({ state: STATE_LOGGING_OUT });
  }

  onDidLogout = () => {
    this.setState({ state: STATE_LOGIN_PROMPT });
  }

  //
  // render
  //
  render() {
    switch (this.state.state) {
      case STATE_INIT:
        return <SpinnerWindow message="Initializing..." />;

      case STATE_LOGIN_PROMPT:
        return <LoginWindow request={this.onLoginRequest} />;

      case STATE_LOGIN_PROMPT_RETRY:
        return (
          <LoginWindow
            request={this.loginRequest}
            notification="Login failed. Please retry."
          />
        );

      case STATE_LOGGING_IN:
        return <SpinnerWindow message="Logging in..." />;

      case STATE_LOGGING_OUT:
        return <SpinnerWindow message="Logging out..." />;

      case STATE_ACTIVE:
        return <PageWindow fb={this.FB} onLogoutRequest={this.onLogoutRequest} />;

      default:
        throw new Error('unexpected state');
    }
  }
}

// expose for test
App.REQUIRED_PERMISSIONS = PERMISSIONS;
