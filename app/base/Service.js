'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
  constructor({ ctx, model }) {
    super(ctx);
    this.model = model;
  }

  static clearEmpty(params) {
    for (const key in params) {
      if (params[ key ] === '' || params[ key ] === undefined) {
        delete params[ key ];
      }
    }
  }

  static fuzzyWhere(where, fuzzyFields) {
    for (const key in where) {
      if (fuzzyFields.indexOf(key) > -1) {
        const val = where[ key ];
        const newVal = val.replace(/\+/g, '\\+');
        const pattern = new RegExp(newVal);
        where[ key ] = { $regex: pattern, $options: 'ims' };
      }
    }
  }

  find(where, pager) {
    const model = this.ctx.model[this.model];
    BaseService.clearEmpty(where);
    if (pager.pageAll) {
      return Promise.all([
        model.find(where).countDocuments(),
        model.find(where).sort({ _id: -1 }),
      ]);
    }
    return Promise.all([
      model.find(where).countDocuments(),
      model.find(where).sort({ _id: -1 })
        .skip((pager.pageIndex - 1) * pager.pageSize)
        .limit(pager.pageSize),
    ]);
  }

  findOne(where) {
    return this.ctx.model[this.model].findOne(where);
  }

  create(params) {
    return this.ctx.model[this.model].create(params);
  }

  updateOne(where, params) {
    return this.ctx.model[this.model].updateOne(where, { $set: params });
  }

  deleteOne(where) {
    return this.ctx.model[this.model].deleteOne(where);
  }
}

module.exports = BaseService;
