// login integration test using sinon mock
import React from 'react';
import assert from 'assert';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { nextTick } from 'process';

import App from 'scripts/components/app';

describe('login flow', () => {
  describe('with healthy FB SDK', () => {
    it('checks getLoginStatus then skips login if connected', (done) => {
      const FB = {
        getLoginStatus: sinon.stub().callsArgWithAsync(0, { status: 'connected' }),
        login: sinon.stub(),
      };
      const app = mount(<App fb={FB} />);
      function check() {
        if (!app.find('.raised').length) {
          assert(FB.getLoginStatus.calledOnce);
          assert(!FB.login.called);
          done();
        } else {
          nextTick(check);
        }
      };
      nextTick(check);
    });
  });
});

