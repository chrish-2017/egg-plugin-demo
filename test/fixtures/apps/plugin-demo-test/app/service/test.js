'use strict';
const Service = require('../../../../../../index').BaseService;

class TestService extends Service {
  constructor(ctx) {
    super({ ctx, model: 'Role' });
  }
}

module.exports = TestService;
