'use strict';

const Controller = require('../../../../../../index').BaseController;

class TestController extends Controller {
  async testSuccess() {
    this.success();
  }

  async testFailure() {
    this.failure('USERNAME_OR_PASSWORD_WRONG');
  }
}

module.exports = TestController;
