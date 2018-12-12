'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(obj) {
    const def = {
      code: '000000',
      description: 'SUCCESS',
    };
    this.ctx.body = Object.assign({}, def, obj);
  }
  failure(code) {
    this.ctx.body = this.ctx.helper.errorCode[code];
  }
}

module.exports = BaseController;
