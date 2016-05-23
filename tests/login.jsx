// login integration test using sinon mock
import React from 'react';
import assert from 'assert';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { nextTick } from 'process';

import App from 'scripts/components/App';

describe('login flow', () => {
  const EXPECTED_PERMISSION_RESPONSE = {
    data: App.REQUIRED_PERMISSIONS.map((p) => {
      return { permission: p, status: 'granted' };
    }),
  };

  function waitBoot(FB, app, done) {
      (new Promise((next) => {
        function check() {
          let loginButton = app.find({id: 'login-button'});
          if (loginButton.length > 0) {
            assert(FB.getLoginStatus.calledOnce);
            assert(!FB.login.called);
            loginButton.simulate('click');
            next();
          } else {
            nextTick(check);
          }
        };
        nextTick(check);
      })).then((next) => {
        function check() {
          if (app.find({id: 'page-window'}).length > 0) {
            // Everything went well,
            // then PageWindow showed up
            assert(FB.getLoginStatus.calledOnce);
            assert(FB.login.calledOnce);
            assert(FB.api.callCount > 1);
            done();
          } else {
            nextTick(check);
          }
        }
        nextTick(check);
      });
  }

  describe('with healthy FB', () => {
    it('checks getLoginStatus then skips login if connected', (done) => {
      const FB = {
        getLoginStatus: sinon.stub().callsArgWithAsync(0, { status: 'connected' }),
        api: sinon.stub().callsArgWithAsync(3, EXPECTED_PERMISSION_RESPONSE),
        login: sinon.stub(),
      };
      const app = mount(<App fb={FB} />);

      // I could not find the best practice to wait app's state transitions.
      // So far we check state transition every frame.
      let callCount = 0;
      function check() {
        callCount++;
        if (app.find('.e-progress-circle').length <= 0) {
          assert(FB.getLoginStatus.calledOnce);
          assert(!FB.login.called);
          assert(FB.api.called);
          assert(callCount > 1);
          done();
        } else {
          nextTick(check);
        }
      };
      nextTick(check);
    });

    it('shows PageWindow after login even if no connection on boot', (done) => {
      const FB = {
        getLoginStatus: sinon.stub().callsArgWithAsync(0, { status: 'no' }),
        api: sinon.stub().callsArgWithAsync(3, EXPECTED_PERMISSION_RESPONSE),
        login: sinon.stub().callsArgWithAsync(0, { authResponse: {} }),
      };
      const app = mount(<App fb={FB} />);

      // make sure login screen shows up, then this app transits to PageWindow
      waitBoot(FB, app, done);
    });
  });

  describe('with broken FB', () => {
    it('tries to login again when permissions are not enough even though preconnected', (done) => {
      const FB = {
        // there is a connection before boot
        getLoginStatus: sinon.stub().callsArgWithAsync(0, { status: 'connected' }),
        // but /me/permissions api returns error
        api: sinon.stub().callsArgWithAsync(3, { error:{} }),
        // login API always succeeds
        login: sinon.stub().callsArgWithAsync(0, { authResponse: {} }),
      };
      const app = mount(<App fb={FB} />);

      // make sure login screen shows up, then this app transits to PageWindow
      waitBoot(FB, app, done);
    });
  });
});

